import Collapse from 'antd/lib/collapse';
import Form, { FormInstance } from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import InputNumber from 'antd/lib/input-number';
import Input from 'antd/lib/input/index';
import Select from 'antd/lib/select';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyDatePicker from '../../../../components/Controls/MyDatePicker';
import MyDebounceSelect, { SelectValue } from '../../../../components/Controls/MyDebounceSelect';
import { fetchToiDanh } from '../../../../reducers/toiDanh';
import { RootState } from '../../../../store';
import { inputNgayThangFormat, inputParse } from '../../../../utils';
import { KET_QUA_AN, KET_QUA_DON, LOAI_TOI_PHAM } from '../../../../utils/constant';
import { getSearchCanBo } from '../../../../utils/services';
import FormItem from '../../ThongTinVuViec/FormItem';

const form = (props: { form?: FormInstance<any>; loading?: boolean }) => {
	const dispatch = useDispatch();
	const toiDanh = useSelector((state: RootState) => state.toiDanh);
	const [loaiVuViec, setLoaiVuViec] = useState('AĐ');

	useEffect(() => {
		toiDanh.status === 'idle' && dispatch(fetchToiDanh());
	}, []);

	useEffect(() => {
		const loaiVV = props.form?.getFieldValue('loai_vu_viec');
		setLoaiVuViec(loaiVV);
	}, [props.loading]);

	const fetchCanBoList = async (q: string, type: string): Promise<SelectValue[]> => {
		return getSearchCanBo({ q, l: 7 }).then((body) =>
			body?.data?.data.map((item: any) => ({
				label: `${item.ho_ten} - ${item.ten_chuc_vu} ${item.ten_don_vi}`,
				value: item.id,
			}))
		);
	};

	const onChangeNgayPhucHoi = (val: moment.Moment) => {
		props.form?.setFieldsValue({
			ngay_ket_thuc_phuc_hoi: val.clone().add(1, 'month'),
		});
	};

	const onChangeLoaiToiPham = (val: LOAI_TOI_PHAM) => {
		let thoi_han = 400;
		if (val === LOAI_TOI_PHAM.IT_NGHIEM_TRONG) thoi_han = 200;
		else if (val === LOAI_TOI_PHAM.NGHIEM_TRONG) thoi_han = 300;
		props.form?.setFieldsValue({ thoi_han_dieu_tra: thoi_han });
		onChangeThoiHanDieuTra(thoi_han);
	};

	const onChangeNgayKhoiTo = (val: moment.Moment) => {
		const thoi_han = props.form?.getFieldValue('thoi_han_dieu_tra') as number;
		const m = thoi_han / 100;
		const d = thoi_han % 100;
		if (thoi_han > 0 && val)
			props.form?.setFieldsValue({
				ngay_ket_thuc_dieu_tra: val.clone().add(m, 'months').add(d, 'days'),
			});
	};

	const onChangeThoiHanDieuTra = (thoi_han: number) => {
		const m = thoi_han / 100;
		const d = thoi_han % 100;
		const val = props.form?.getFieldValue('ngay_khoi_to');
		if (thoi_han > 0 && val)
			props.form?.setFieldsValue({
				ngay_ket_thuc_dieu_tra: val.clone().add(m, 'months').add(d, 'days'),
			});
	};

	return (
		<Collapse defaultActiveKey="ttbd">
			<Collapse.Panel key="ttbd" header="Thông tin ban đầu">
				<FormItem form={props.form} loading={props.loading} setLoaiVuViec={setLoaiVuViec} />
			</Collapse.Panel>

			<Collapse.Panel key="ttdt" header="Thời hạn xác minh">
				<Row gutter={[10, 5]}>
					<Col span={12} sm={6}>
						<Form.Item name="ngay_keo_dai" label="Ngày kéo dài">
							<MyDatePicker format="DD/MM/YYYY" />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="ngay_ket_thuc_1" label="Ngày kết thúc 1">
							<MyDatePicker format="DD/MM/YYYY" />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="ngay_gia_han_xac_minh" label="Ngày gia hạn xác minh">
							<MyDatePicker format="DD/MM/YYYY" />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="ngay_ket_thuc_2" label="Ngày kết thúc 2">
							<MyDatePicker format="DD/MM/YYYY" />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="ngay_phuc_hoi" label="Ngày phục hồi">
							<MyDatePicker format="DD/MM/YYYY" onChange={onChangeNgayPhucHoi} />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="ngay_ket_thuc_phuc_hoi" label="Ngày kết thúc phục hồi">
							<MyDatePicker format="DD/MM/YYYY" />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="ket_qua_giai_quyet" label="Kết quả giải quyết">
							<Select allowClear>
								{KET_QUA_DON.map((td, index) => (
									<Select.Option value={td} key={index}>
										{td}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
			</Collapse.Panel>

			{loaiVuViec === 'AK' && (
				<Collapse.Panel key="kt" header="Khởi tố vụ án">
					<Row gutter={[10, 5]}>
						<Col span={12} sm={6}>
							<Form.Item name="ngay_khoi_to" label="Ngày khởi tố">
								<MyDatePicker format="DD/MM/YYYY" onChange={onChangeNgayKhoiTo} />
							</Form.Item>
						</Col>
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
								<Select onChange={onChangeLoaiToiPham}>
									{Object.values(LOAI_TOI_PHAM).map((td, index) => (
										<Select.Option value={td} key={index}>
											{td}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={12} sm={6}>
							<Form.Item
								name="thoi_han_dieu_tra"
								label="Thời hạn điều tra"
								tooltip="Ví dụ: nhập 210 hay 2 _ 10 tương đương với 2 tháng 10 ngày"
							>
								<InputNumber
									style={{ width: '100%' }}
									formatter={inputNgayThangFormat}
									parser={inputParse}
									onChange={onChangeThoiHanDieuTra}
								/>
							</Form.Item>
						</Col>
						<Col span={12} sm={6}>
							<Form.Item name="ngay_ket_thuc_dieu_tra" label="Ngày kết thúc điều tra">
								<MyDatePicker format="DD/MM/YYYY" />
							</Form.Item>
						</Col>
						<Col span={12} sm={6}>
							<Form.Item name="ngay_gia_han" label="Ngày gia hạn">
								<MyDatePicker format="DD/MM/YYYY" />
							</Form.Item>
						</Col>
						<Col span={12} sm={6}>
							<Form.Item
								name="thoi_gian_gia_han"
								label="Thời gian gia hạn"
								tooltip="Ví dụ: nhập 210 hay 2 _ 10 tương đương với 2 tháng 10 ngày"
							>
								<InputNumber
									style={{ width: '100%' }}
									formatter={inputNgayThangFormat}
									parser={inputParse}
								/>
							</Form.Item>
						</Col>
						<Col span={12} sm={6}>
							<Form.Item name="ket_qua_an" label="Kết quả án">
								<Select>
									{KET_QUA_AN.map((td, index) => (
										<Select.Option value={td} key={index}>
											{td}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</Row>
				</Collapse.Panel>
			)}

			<Collapse.Panel key="hs" header="Thông tin hồ sơ">
				<Row gutter={[10, 5]}>
					<Col span={12} sm={6}>
						<Form.Item name="ngay_lap_ho_so" label="Ngày lập hồ sơ">
							<MyDatePicker format="DD/MM/YYYY" />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="ngay_dang_ky_ho_so" label="Ngày đăng ký hồ sơ">
							<MyDatePicker format="DD/MM/YYYY" />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="so_ho_so" label="Số hồ sơ">
							<Input />
						</Form.Item>
					</Col>
				</Row>
			</Collapse.Panel>

			<Collapse.Panel key="cb" header="Phân công cán bộ">
				<Row gutter={[10, 5]}>
					<Col span={24} sm={12}>
						<Form.Item name="sel_dtv_chinh" label="Điều tra viên chính">
							<MyDebounceSelect
								allowClear
								placeholder="Tìm theo tên cán bộ..."
								fetchOptions={(q) => fetchCanBoList(q, 'dtv')}
							/>
						</Form.Item>
					</Col>
					<Col span={24} sm={12}>
						<Form.Item name="sel_can_bo_chinh" label="Cán bộ chính">
							<MyDebounceSelect
								allowClear
								placeholder="Tìm theo tên cán bộ..."
								fetchOptions={(q) => fetchCanBoList(q, '')}
							/>
						</Form.Item>
					</Col>
					<Col span={24} sm={12}>
						<Form.Item name="ten_nguoi_tao" label="Người tạo vụ việc">
							<Input readOnly />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="created_at" label="Ngày tạo">
							<MyDatePicker format="DD/MM/YYYY" disabled />
						</Form.Item>
					</Col>
				</Row>
			</Collapse.Panel>
		</Collapse>
	);
};

export default form;
