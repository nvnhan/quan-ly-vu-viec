import Form, { FormInstance } from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import Select from 'antd/lib/select';
import React, { useEffect, useState } from 'react';
import MyDatePicker from '../../../components/Controls/MyDatePicker';
import MyDebounceSelect, { SelectValue } from '../../../components/Controls/MyDebounceSelect';
import { useMergeState } from '../../../utils';
import { PHAN_LOAI_TIN } from '../../../utils/constant';
import { required } from '../../../utils/rules';
import { getSearchXaPhuong } from '../../../utils/services';

const form = (props: { form?: FormInstance<any>; loading?: boolean; setLoaiVuViec?: any }) => {
	const [state, setState] = useState<{
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

	useEffect(() => {
		const val = props.form?.getFieldValue('phan_loai_tin');
		onChangePhanLoaiTin(val);
	}, [props.loading]);

	const fetchUnitList = async (q: string): Promise<SelectValue[]> => {
		return getSearchXaPhuong({ q, l: 10 }).then((body) =>
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

	return (
		<>
			<Row gutter={[10, 5]}>
				<Col span={12} sm={6}>
					<Form.Item name="loai_vu_viec" label="Loại vụ việc" rules={[required]}>
						<Select onChange={props?.setLoaiVuViec}>
							<Select.Option value="AĐ">Tiếp nhận tin ban đầu</Select.Option>
							<Select.Option value="AK">Vụ án khởi tố</Select.Option>
						</Select>
					</Form.Item>
				</Col>
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
				<Col span={12} sm={6}>
					<Form.Item name="ngay_cqdt" label="Ngày CQĐT tiếp nhận">
						<MyDatePicker format="DD/MM/YYYY" onChange={onChangeNgayCQDT} />
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
			</Row>

			<Row gutter={[10, 5]}>
				<Col span={12} sm={6}>
					<Form.Item name="ngay_phan_cong" label="Ngày phân công">
						<MyDatePicker format="DD/MM/YYYY" />
					</Form.Item>
				</Col>
				<Col span={12} sm={6}>
					<Form.Item name="so_phan_cong" label="Số phân công">
						<Input />
					</Form.Item>
				</Col>
				<Col span={24} sm={12}>
					<Form.Item name="noi_dung_tom_tat" label={state.noiDungLabel} rules={[required]}>
						<Input />
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
