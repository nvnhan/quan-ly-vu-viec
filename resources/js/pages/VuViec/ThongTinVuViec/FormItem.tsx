import Form, { FormInstance } from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import Select from 'antd/lib/select';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyDatePicker from '../../../components/Controls/MyDatePicker';
import MyDebounceSelect, { SelectValue } from '../../../components/Controls/MyDebounceSelect';
import { fetchToiDanh } from '../../../reducers/toiDanh';
import { RootState } from '../../../store';
import { useMergeState } from '../../../utils';
import { LOAI_TOI_PHAM, NOI_THUC_HIEN_PHAM_TOI, PHAN_LOAI_TIN, PHUONG_THUC_PHAM_TOI } from '../../../utils/constant';
import { length, required } from '../../../utils/rules';
import { getSearchXaPhuong } from '../../../utils/services';

const form = (props: {
	form?: FormInstance<any>;
	loading?: boolean;
	setLoaiVuViec?: any;
	onChangeData?: any;
	edit?: boolean;
}) => {
	const authUser = useSelector((state: RootState) => state.authUserReducer);
	const dispatch = useDispatch();
	const toiDanh = useSelector((state: RootState) => state.toiDanh);
	const [state, setState] = useMergeState<{
		ngayCAPVisible: boolean;
		ngayCAPLabel: string;
		noiDungLabel: string;
		donViChuyenTinVisible: boolean;
	}>({
		ngayCAPVisible: true,
		ngayCAPLabel: 'Ngày CA phường tiếp nhận',
		noiDungLabel: 'Nội dung tóm tắt',
		donViChuyenTinVisible: false,
	});
	const [loaiVuViec, setLoaiVuViec] = useState('AĐ');

	useEffect(() => {
		toiDanh.status === 'idle' && dispatch(fetchToiDanh());
	}, []);

	useEffect(() => {
		const val = props.form?.getFieldValue('phan_loai_tin');
		onChangePhanLoaiTin(val);
		const loaiVV = props.form?.getFieldValue('loai_vu_viec');
		loaiVV && onChangeLoaiVuViec(loaiVV);
	}, [props.loading]);

	const fetchUnitList = async (q: string): Promise<SelectValue[]> => {
		return getSearchXaPhuong({ q, l: 20 }).then((body) =>
			body?.data?.data.map((item: any) => ({
				label: `${item.loai_don_vi} ${item.ten_don_vi} - ${item.ten_dia_phuong}`,
				value: item.id,
			}))
		);
	};

	const onChangePhanLoaiTin = (val: PHAN_LOAI_TIN) => {
		switch (val) {
			case PHAN_LOAI_TIN.TO_GIAC_TOI_PHAM:
			case PHAN_LOAI_TIN.CQDT_PHAT_HIEN:
				setState({
					ngayCAPVisible: false,
					ngayCAPLabel: 'Ngày CA phường tiếp nhận',
					noiDungLabel: 'Nội dung tóm tắt',
					donViChuyenTinVisible: false,
				});
				break;
			case PHAN_LOAI_TIN.TIN_BAO_TOI_PHAM:
				setState({
					ngayCAPVisible: true,
					ngayCAPLabel: 'Ngày tiếp nhận của ĐV chuyển tin báo',
					noiDungLabel: 'Nội dung nguồn tin về tội phạm',
					donViChuyenTinVisible: true,
				});
				break;
			case PHAN_LOAI_TIN.KIEN_NGHI_KHOI_TO:
				setState({
					ngayCAPVisible: true,
					ngayCAPLabel: 'Ngày CAP tiếp nhận',
					noiDungLabel: 'Nội dung tóm tắt',
					donViChuyenTinVisible: false,
				});
				break;
		}
	};

	const onChangeNgayCQDT = (val: moment.Moment) => {
		props.form?.setFieldsValue({
			ngay_keo_dai: val.clone().add(20, 'day'),
			ngay_ket_thuc_1: val.clone().add(2, 'month'),
		});
	};

	const onChangeLoaiVuViec = (val: string) => {
		setLoaiVuViec(val);
		props?.setLoaiVuViec && props?.setLoaiVuViec(val);
		if (val === 'AK') setState({ noiDungLabel: 'Nội dung tóm tắt' });
	};

	return (
		<>
			<Row gutter={[10, 5]}>
				<Col span={12} sm={6}>
					<Form.Item name="loai_vu_viec" label="Loại vụ việc" rules={[required]}>
						<Select onChange={onChangeLoaiVuViec}>
							<Select.Option value="AĐ">Tiếp nhận tin ban đầu</Select.Option>
							<Select.Option value="AK">Vụ án khởi tố</Select.Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={12} sm={6}>
					<Form.Item name="ngay_cqdt" label="Ngày CQĐT tiếp nhận" rules={[required]}>
						<MyDatePicker
							format="DD/MM/YYYY"
							onChange={onChangeNgayCQDT}
							disabled={props.edit && !authUser.quan_tri}
						/>
					</Form.Item>
				</Col>

				{loaiVuViec === 'AĐ' ? (
					<>
						<Col span={12} sm={6}>
							<Form.Item name="phan_loai_tin" label="Phân loại tin">
								<Select onChange={onChangePhanLoaiTin}>
									{Object.values(PHAN_LOAI_TIN).map((pl, index) => (
										<Select.Option value={pl} key={index}>
											{pl}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						{state.ngayCAPVisible && (
							<Col span={12} sm={6}>
								<Form.Item name="ngay_ca_phuong" label={state.ngayCAPLabel}>
									<MyDatePicker format="DD/MM/YYYY" />
								</Form.Item>
							</Col>
						)}
						{state.donViChuyenTinVisible && (
							<Col span={12} sm={6}>
								<Form.Item name="don_vi_chuyen_tin" label="Đơn vị chuyển tin">
									<Input />
								</Form.Item>
							</Col>
						)}
					</>
				) : (
					<>
						<Col span={12} sm={6}>
							<Form.Item name="ma_toi_danh" label="Tội danh">
								<Select allowClear showSearch placeholder="Chọn tội danh">
									{toiDanh.list.map((td) => (
										<Select.Option value={td.id} key={td.id}>
											Điều {td.id} {td.value}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={12} sm={6}>
							<Form.Item name="loai_toi_pham" label="Loại tội phạm">
								<Select onChange={props.onChangeData} allowClear>
									{Object.values(LOAI_TOI_PHAM).map((td, index) => (
										<Select.Option value={td} key={index}>
											{td}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</>
				)}
				<Col span={12} sm={6}>
					<Form.Item name="phuong_thuc_pham_toi" label="Phương thức phạm tội">
						<Select showSearch allowClear>
							{PHUONG_THUC_PHAM_TOI.map((td, index) => (
								<Select.Option value={td} key={index}>
									{td}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				</Col>
				<Col span={12} sm={6}>
					<Form.Item name="noi_thuc_hien_pham_toi" label="Nơi thực hiện phạm tội">
						<Select allowClear>
							{NOI_THUC_HIEN_PHAM_TOI.map((td, index) => (
								<Select.Option value={td} key={index}>
									{td}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={[10, 5]}>
				<Col span={12} sm={6}>
					<Form.Item name="ngay_phan_cong" label="Ngày xử lý đơn thư">
						<MyDatePicker format="DD/MM/YYYY" disabled={props.edit && !authUser.quan_tri} />
					</Form.Item>
				</Col>
				<Col span={12} sm={6}>
					<Form.Item name="so_phan_cong" label="Số phiếu xử lý đơn thư">
						<Input disabled={props.edit && !authUser.quan_tri} />
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item name="noi_dung_tom_tat" label={state.noiDungLabel} rules={[required, length(1000)]}>
						<Input.TextArea rows={2} disabled={props.edit && !authUser.quan_tri} />
					</Form.Item>
				</Col>
				<Col span={12} sm={6}>
					<Form.Item name="thoi_diem_xay_ra" label="Thời điểm xảy ra">
						<Input />
					</Form.Item>
				</Col>
				<Col span={12} sm={6}>
					<Form.Item name="noi_xay_ra" label="Nơi xảy ra">
						<Input />
					</Form.Item>
				</Col>
				<Col span={24} sm={12}>
					<Form.Item name="sel_dp_xay_ra" label="Địa phương xảy ra">
						<MyDebounceSelect
							mode="multiple"
							placeholder="Chọn địa phương xã/phường..."
							fetchOptions={fetchUnitList}
							allowClear
						/>
					</Form.Item>
				</Col>
			</Row>
		</>
	);
};

export default form;
