import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Collapse from 'antd/lib/collapse';
import Form, { FormInstance } from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import InputNumber from 'antd/lib/input-number';
import Input from 'antd/lib/input/index';
import Select from 'antd/lib/select';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import MyDatePicker from '../../../../components/Controls/MyDatePicker';
import MyDebounceSelect, { SelectValue } from '../../../../components/Controls/MyDebounceSelect';
import { inputNgayThangFormat, inputParse, useMergeState } from '../../../../utils';
import { KET_QUA_AN, KET_QUA_DON, LOAI_TOI_PHAM } from '../../../../utils/constant';
import { getSearchCanBo } from '../../../../utils/services';
import FormItem from '../../ThongTinVuViec/FormItem';
import { Model } from '../../../../reducers/type';

const form = (props: { form?: FormInstance<any>; loading?: boolean; authUser?: Model.User; nguoi_tao?: number }) => {
	const [form] = Form.useForm();
	const [loaiVuViec, setLoaiVuViec] = useState('AĐ');
	const [dataUpdate, setDataUpdate] = useState<{
		visible: boolean;
		source?: string;
		destination?: string;
	}>({ visible: false });
	const [dataBinding, setDataBinding] = useMergeState<{
		ngay_gia_han_xac_minh?: any;
		ngay_ket_thuc_2?: any;
		ngay_ket_thuc_dieu_tra?: any;
		ngay_ket_thuc_dieu_tra_1?: any;
		ngay_ket_thuc_dieu_tra_2?: any;
		ngay_ket_thuc_dieu_tra_3?: any;
		ngay_phuc_hoi?: any;
		ket_qua_giai_quyet?: string;
	}>({});

	useEffect(() => {
		const val = props.form?.getFieldsValue([
			'ngay_gia_han_xac_minh',
			'ngay_ket_thuc_2',
			'ngay_ket_thuc_dieu_tra',
			'ngay_ket_thuc_dieu_tra_1',
			'ngay_ket_thuc_dieu_tra_2',
			'ngay_ket_thuc_dieu_tra_3',
			'ngay_phuc_hoi',
			'ket_qua_giai_quyet',
		]);
		setDataBinding(val);
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
		setDataBinding({ ngay_phuc_hoi: val });
	};

	const onChangeData = () => {
		const loai_tp = props.form?.getFieldValue('loai_toi_pham') as LOAI_TOI_PHAM;
		let thoi_han = 400;
		if (loai_tp === LOAI_TOI_PHAM.IT_NGHIEM_TRONG) thoi_han = 200;
		else if (loai_tp === LOAI_TOI_PHAM.NGHIEM_TRONG) thoi_han = 300;

		const m = thoi_han / 100;
		const d = thoi_han % 100;
		let val = props.form?.getFieldValue('ngay_khoi_to');
		if (typeof val === 'string') val = moment(val, 'DD/MM/YYYY');
		if (thoi_han > 0 && val) {
			props.form?.setFieldsValue({
				ngay_ket_thuc_dieu_tra: val.clone().add(m, 'months').add(d, 'days'),
			});
			onChangeDataInternal('ngay_ket_thuc_dieu_tra');
		}
	};

	const onChangeDataInternal = (field: string) => {
		const val = props.form?.getFieldsValue([field]);
		setDataBinding({ ...dataBinding, ...val });
	};

	const onSubmitDataInternal = () => {
		form.validateFields().then((values) => {
			const source = moment(dataBinding[dataUpdate.source ?? ''], 'DD/MM/YYYY');
			const m = Math.floor(values.so_ngay / 100);
			const d = values.so_ngay % 100;
			let des: { [key: string]: any } = {};
			des[dataUpdate.destination ?? ''] = source.add(m, 'months').add(d, 'days');
			setDataBinding(des);
			props.form?.setFieldsValue(des);
			setDataUpdate({ visible: false });
		});
	};

	return (
		<>
			<Collapse defaultActiveKey="ttbd">
				<Collapse.Panel key="ttbd" header="Thông tin ban đầu">
					<FormItem
						form={props.form}
						loading={props.loading}
						setLoaiVuViec={setLoaiVuViec}
						onChangeData={onChangeData}
						edit={true}
					/>
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
								<MyDatePicker
									format="DD/MM/YYYY"
									onChange={() => onChangeDataInternal('ngay_gia_han_xac_minh')}
								/>
							</Form.Item>
						</Col>
						{dataBinding.ngay_gia_han_xac_minh && (
							<Col span={12} sm={6}>
								{dataBinding.ngay_ket_thuc_2 ? (
									<Form.Item name="ngay_ket_thuc_2" label="Ngày kết thúc 2">
										<MyDatePicker format="DD/MM/YYYY" />
									</Form.Item>
								) : (
									<Button
										type="link"
										onClick={() =>
											setDataUpdate({
												visible: true,
												source: 'ngay_gia_han_xac_minh',
												destination: 'ngay_ket_thuc_2',
											})
										}
									>
										Ngày kết thúc 2
									</Button>
								)}
							</Col>
						)}
					</Row>

					<Row gutter={[10, 5]}>
						<Col span={12} sm={6}>
							<Form.Item name="ket_qua_giai_quyet" label="Kết quả giải quyết">
								<Select allowClear onChange={(val) => setDataBinding({ ket_qua_giai_quyet: val })}>
									{KET_QUA_DON.map((td, index) => (
										<Select.Option value={td} key={index}>
											{td}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						{dataBinding.ket_qua_giai_quyet === 'Tạm đình chỉ' &&
							(dataBinding.ngay_phuc_hoi ? (
								<>
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
								</>
							) : (
								<Col span={12} sm={6}>
									<Button
										onClick={() => {
											setDataBinding({ ngay_phuc_hoi: moment() });
											props.form?.setFieldsValue({ ngay_phuc_hoi: moment() });
											onChangeNgayPhucHoi(moment());
										}}
										type="link"
									>
										Thêm ngày phục hồi
									</Button>
								</Col>
							))}
					</Row>
				</Collapse.Panel>

				{loaiVuViec === 'AK' && (
					<Collapse.Panel key="kt" header="Khởi tố vụ án">
						<Row gutter={[10, 5]}>
							<Col span={12} sm={6}>
								<Form.Item name="ngay_khoi_to" label="Ngày khởi tố">
									<MyDatePicker format="DD/MM/YYYY" onChange={onChangeData} />
								</Form.Item>
							</Col>

							<Col span={12} sm={6}>
								<Form.Item name="ngay_ket_thuc_dieu_tra" label="Ngày kết thúc điều tra">
									<MyDatePicker
										format="DD/MM/YYYY"
										onChange={() => onChangeDataInternal('ngay_ket_thuc_dieu_tra')}
									/>
								</Form.Item>
							</Col>
							{dataBinding.ngay_ket_thuc_dieu_tra && (
								<>
									<Col span={12} sm={6}>
										{dataBinding.ngay_ket_thuc_dieu_tra_1 ? (
											<Form.Item name="ngay_ket_thuc_dieu_tra_1" label="Ngày kết thúc điều tra 1">
												<MyDatePicker
													format="DD/MM/YYYY"
													onChange={() => onChangeDataInternal('ngay_ket_thuc_dieu_tra_1')}
												/>
											</Form.Item>
										) : (
											<Button
												type="link"
												onClick={() =>
													setDataUpdate({
														visible: true,
														source: 'ngay_ket_thuc_dieu_tra',
														destination: 'ngay_ket_thuc_dieu_tra_1',
													})
												}
											>
												Ngày kết thúc điều tra 1
											</Button>
										)}
									</Col>
									{dataBinding.ngay_ket_thuc_dieu_tra_1 && (
										<>
											<Col span={12} sm={6}>
												{dataBinding.ngay_ket_thuc_dieu_tra_2 ? (
													<Form.Item
														name="ngay_ket_thuc_dieu_tra_2"
														label="Ngày kết thúc điều tra 2"
													>
														<MyDatePicker
															format="DD/MM/YYYY"
															onChange={() =>
																onChangeDataInternal('ngay_ket_thuc_dieu_tra_2')
															}
														/>
													</Form.Item>
												) : (
													<Button
														type="link"
														onClick={() =>
															setDataUpdate({
																visible: true,
																source: 'ngay_ket_thuc_dieu_tra_1',
																destination: 'ngay_ket_thuc_dieu_tra_2',
															})
														}
													>
														Ngày kết thúc điều tra 2
													</Button>
												)}
											</Col>
											{dataBinding.ngay_ket_thuc_dieu_tra_2 && (
												<Col span={12} sm={6}>
													{dataBinding.ngay_ket_thuc_dieu_tra_3 ? (
														<Form.Item
															name="ngay_ket_thuc_dieu_tra_3"
															label="Ngày kết thúc điều tra 3"
														>
															<MyDatePicker
																format="DD/MM/YYYY"
																onChange={() =>
																	onChangeDataInternal('ngay_ket_thuc_dieu_tra_3')
																}
															/>
														</Form.Item>
													) : (
														<Button
															type="link"
															onClick={() =>
																setDataUpdate({
																	visible: true,
																	source: 'ngay_ket_thuc_dieu_tra_2',
																	destination: 'ngay_ket_thuc_dieu_tra_3',
																})
															}
														>
															Ngày kết thúc điều tra 3
														</Button>
													)}
												</Col>
											)}
										</>
									)}
								</>
							)}
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
									disabled={!props?.authUser?.quan_tri && props.nguoi_tao !== props.authUser?.id}
								/>
							</Form.Item>
						</Col>
						<Col span={24} sm={12}>
							<Form.Item name="sel_can_bo_chinh" label="Cán bộ chính">
								<MyDebounceSelect
									allowClear
									placeholder="Tìm theo tên cán bộ..."
									fetchOptions={(q) => fetchCanBoList(q, '')}
									disabled={!props?.authUser?.quan_tri && props.nguoi_tao !== props.authUser?.id}
								/>
							</Form.Item>
						</Col>
						<Col span={24} sm={12}>
							<Form.Item name="ten_nguoi_tao" label="Người tạo vụ việc">
								<Input disabled />
							</Form.Item>
						</Col>
						<Col span={12} sm={6}>
							<Form.Item name="ten_don_vi" label="Đơn vị thụ lý">
								<Input disabled />
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

			<Modal
				visible={dataUpdate.visible}
				title="Cập nhật"
				onCancel={() => setDataUpdate({ visible: false })}
				onOk={onSubmitDataInternal}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="so_ngay"
						label="Số ngày thay đổi"
						tooltip="Ví dụ: nhập 210 hay 2 _ 10 tương đương với 2 tháng 10 ngày"
					>
						<InputNumber
							placeholder="Theo định dạng mm _ dd"
							style={{ width: '100%' }}
							formatter={inputNgayThangFormat}
							parser={inputParse}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default form;
