import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Collapse from 'antd/lib/collapse';
import Form, { FormInstance } from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import InputNumber from 'antd/lib/input-number';
import Input from 'antd/lib/input/index';
import Select from 'antd/lib/select';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyDatePicker from '../../../../components/Controls/MyDatePicker';
import { fetchToiDanh } from '../../../../reducers/toiDanh';
import { Model } from '../../../../reducers/type';
import { RootState } from '../../../../store';
import { inputNgayThangFormat, inputParse, useMergeState } from '../../../../utils';
import { LOAI_TOI_PHAM, TRUONG_HOP_BAT, TU_CACH_TO_TUNG } from '../../../../utils/constant';
import { required } from '../../../../utils/rules';

const form = (props: { form?: FormInstance<any>; vuViec: Model.VuViec; record: any; loading?: boolean }) => {
	const dispatch = useDispatch();
	const toiDanh = useSelector((state: RootState) => state.toiDanh);
	const { vuViec } = props;
	const [biCan, setBiCan] = useState(false);

	const [form] = Form.useForm();
	const [dataUpdate, setDataUpdate] = useState<{
		visible: boolean;
		source?: string;
		destination?: string;
	}>({ visible: false });
	const [dataBinding, setDataBinding] = useMergeState<{
		ngay_tam_giu?: any;
		ngay_ket_thuc_tam_giu?: any;
		ngay_ket_thuc_tam_giu_1?: any;
		ngay_ket_thuc_tam_giu_2?: any;
		ngay_tam_giam?: any;
		ngay_ket_thuc_tam_giam?: any;
		ngay_ket_thuc_tam_giam_1?: any;
		ngay_ket_thuc_tam_giam_2?: any;
	}>({});

	useEffect(() => {
		toiDanh.status === 'idle' && dispatch(fetchToiDanh());
	}, []);

	useEffect(() => {
		const val = props.form?.getFieldsValue([
			'ngay_tam_giu',
			'ngay_ket_thuc_tam_giu',
			'ngay_ket_thuc_tam_giu_1',
			'ngay_ket_thuc_tam_giu_2',
			'ngay_tam_giam',
			'ngay_ket_thuc_tam_giam',
			'ngay_ket_thuc_tam_giam_1',
			'ngay_ket_thuc_tam_giam_2',
		]);
		setDataBinding(val);
	}, [props.loading]);

	useEffect(() => {
		onChangeTuCachToTung(props.record?.tu_cach_to_tung);
	}, [props.record]);

	const onChangeTuCachToTung = (val: any) => setBiCan(val <= 6);

	const onChangeNgayTamGiam = (val: moment.Moment) => {
		if (val) {
			let thoi_han_giam = 120;
			if (vuViec.loai_toi_pham === LOAI_TOI_PHAM.IT_NGHIEM_TRONG) thoi_han_giam = 60;
			else if (vuViec.loai_toi_pham === LOAI_TOI_PHAM.NGHIEM_TRONG) thoi_han_giam = 90;
			let ngay_ket_thuc_tam_giu = moment(
				dataBinding.ngay_ket_thuc_tam_giu_2 ??
					dataBinding.ngay_ket_thuc_tam_giu_1 ??
					dataBinding.ngay_ket_thuc_tam_giu,
				'DD/MM/YYYY'
			);
			if (val < ngay_ket_thuc_tam_giu) ngay_ket_thuc_tam_giu = val;
			let so_ngay_tam_giu_thuc_te = moment
				.duration(ngay_ket_thuc_tam_giu.diff(moment(dataBinding.ngay_tam_giu, 'DD/MM/YYYY')))
				.days();
			if (isNaN(so_ngay_tam_giu_thuc_te)) so_ngay_tam_giu_thuc_te = 0;
			props.form?.setFieldsValue({
				ngay_ket_thuc_tam_giam: val.clone()?.add(thoi_han_giam - so_ngay_tam_giu_thuc_te - 1, 'days'),
			});
		} else props.form?.setFieldsValue({ ngay_ket_thuc_tam_giam: null });
		onChangeDataInternal(['ngay_tam_giam', 'ngay_ket_thuc_tam_giam']);
	};

	const onChangeNgayTamGiu = (val: moment.Moment) => {
		if (val) props.form?.setFieldsValue({ ngay_ket_thuc_tam_giu: val.clone().add(3, 'days') });
		else props.form?.setFieldsValue({ ngay_ket_thuc_tam_giu: null });
		onChangeDataInternal(['ngay_tam_giu', 'ngay_ket_thuc_tam_giu']);
	};

	const onChangeDataInternal = (field: string[]) => {
		const val = props.form?.getFieldsValue(field);
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
			<Collapse defaultActiveKey="ttvt">
				<Collapse.Panel header="Th??ng tin li??n quan ?????n v??? vi???c" key="ttvt">
					<Row gutter={[12, 0]}>
						<Col span={12} sm={6}>
							<Form.Item name="tu_cach_to_tung" label="T?? c??ch t??? t???ng" rules={[required]}>
								<Select onChange={onChangeTuCachToTung}>
									{TU_CACH_TO_TUNG.map((item) => (
										<Select.Option value={item.id} key={item.id}>
											{item.label}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						{biCan && (
							<>
								<Col span={12} sm={6}>
									<Form.Item name="hanh_vi" label="H??nh vi">
										<Input />
									</Form.Item>
								</Col>
								<Col span={12} sm={6}>
									<Form.Item name="ngay_xay_ra_bc" label="Ng??y x???y ra">
										<MyDatePicker format="DD/MM/YYYY" />
									</Form.Item>
								</Col>
								<Col span={12} sm={6}>
									<Form.Item name="noi_xay_ra_bc" label="N??i x???y ra">
										<Input />
									</Form.Item>
								</Col>
							</>
						)}

						<Col span={24}>
							<Form.Item name="loi_khai" label="L???i khai">
								<Input.TextArea rows={8} />
							</Form.Item>
						</Col>
					</Row>

					{biCan && (
						<>
							<Row gutter={[12, 0]}>
								<Col span={12} sm={6}>
									<Form.Item name="ngay_khoi_to_bc" label="Ng??y kh???i t???">
										<MyDatePicker format="DD/MM/YYYY" />
									</Form.Item>
								</Col>
								<Col span={12} sm={6}>
									<Form.Item name="ma_toi_danh_bc" label="T???i danh">
										<Select allowClear showSearch>
											{toiDanh.list.map((td) => (
												<Select.Option value={td.id} key={td.id}>
													??i???u {td.id} {td.value}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
								</Col>
								<Col span={12} sm={6}>
									<Form.Item name="ngay_bat" label="Ng??y b???t">
										<MyDatePicker format="DD/MM/YYYY" />
									</Form.Item>
								</Col>
								<Col span={12} sm={6}>
									<Form.Item name="truong_hop_bat" label="Tr?????ng h???p b???t">
										<Select allowClear>
											{TRUONG_HOP_BAT.map((th, index) => (
												<Select.Option value={th} key={index}>
													{th}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={[12, 0]}>
								<Col span={12} sm={6}>
									<Form.Item name="ngay_tam_giu" label="Ng??y t???m gi???">
										<MyDatePicker format="DD/MM/YYYY" onChange={onChangeNgayTamGiu} />
									</Form.Item>
								</Col>
								{dataBinding.ngay_tam_giu && (
									<>
										<Col span={12} sm={6}>
											<Form.Item name="ngay_ket_thuc_tam_giu" label="Ng??y k???t th??c t???m gi???">
												<MyDatePicker
													format="DD/MM/YYYY"
													onChange={() => onChangeDataInternal(['ngay_ket_thuc_tam_giu'])}
												/>
											</Form.Item>
										</Col>
										{dataBinding.ngay_ket_thuc_tam_giu && (
											<>
												<Col span={12} sm={6}>
													{dataBinding.ngay_ket_thuc_tam_giu_1 ? (
														<Form.Item
															name="ngay_ket_thuc_tam_giu_1"
															label="Ng??y k???t th??c t???m gi??? 1"
														>
															<MyDatePicker
																format="DD/MM/YYYY"
																onChange={() =>
																	onChangeDataInternal(['ngay_ket_thuc_tam_giu_1'])
																}
															/>
														</Form.Item>
													) : (
														<Button
															type="link"
															onClick={() => {
																props.form?.setFieldsValue({
																	ngay_ket_thuc_tam_giu_1:
																		dataBinding.ngay_ket_thuc_tam_giu
																			.clone()
																			.add(3, 'days'),
																});
																onChangeDataInternal(['ngay_ket_thuc_tam_giu_1']);
															}}
														>
															Gia h???n t???m gi??? l???n 1
														</Button>
													)}
												</Col>
												{dataBinding.ngay_ket_thuc_tam_giu_1 > 0 && (
													<Col span={12} sm={6}>
														{dataBinding.ngay_ket_thuc_tam_giu_2 ? (
															<Form.Item
																name="ngay_ket_thuc_tam_giu_2"
																label="Ng??y k???t th??c t???m gi??? 2"
															>
																<MyDatePicker
																	format="DD/MM/YYYY"
																	onChange={() =>
																		onChangeDataInternal([
																			'ngay_ket_thuc_tam_giu_2',
																		])
																	}
																/>
															</Form.Item>
														) : (
															<Button
																type="link"
																onClick={() => {
																	props.form?.setFieldsValue({
																		ngay_ket_thuc_tam_giu_2:
																			dataBinding.ngay_ket_thuc_tam_giu_1
																				.clone()
																				.add(3, 'days'),
																	});
																	onChangeDataInternal(['ngay_ket_thuc_tam_giu_2']);
																}}
															>
																Gia h???n t???m gi??? l???n 2
															</Button>
														)}
													</Col>
												)}
											</>
										)}
									</>
								)}
							</Row>
							<Row gutter={[12, 0]}>
								<Col span={12} sm={6}>
									<Form.Item name="ngay_tam_giam" label="Ng??y t???m giam">
										<MyDatePicker onChange={onChangeNgayTamGiam} format="DD/MM/YYYY" />
									</Form.Item>
								</Col>
								{dataBinding.ngay_tam_giam && (
									<>
										<Col span={12} sm={6}>
											<Form.Item name="ngay_ket_thuc_tam_giam" label="Ng??y k???t th??c t???m giam">
												<MyDatePicker
													format="DD/MM/YYYY"
													onChange={() => onChangeDataInternal(['ngay_ket_thuc_tam_giam'])}
												/>
											</Form.Item>
										</Col>
										{dataBinding.ngay_ket_thuc_tam_giam && (
											<>
												<Col span={12} sm={6}>
													{dataBinding.ngay_ket_thuc_tam_giam_1 ? (
														<Form.Item
															name="ngay_ket_thuc_tam_giam_1"
															label="Ng??y k???t th??c t???m giam 1"
														>
															<MyDatePicker
																format="DD/MM/YYYY"
																onChange={() =>
																	onChangeDataInternal(['ngay_ket_thuc_tam_giam_1'])
																}
															/>
														</Form.Item>
													) : (
														<Button
															type="link"
															onClick={() =>
																setDataUpdate({
																	visible: true,
																	source: 'ngay_ket_thuc_tam_giam',
																	destination: 'ngay_ket_thuc_tam_giam_1',
																})
															}
														>
															Ng??y k???t th??c t???m giam 1
														</Button>
													)}
												</Col>
												{dataBinding.ngay_ket_thuc_tam_giam_1 && (
													<Col span={12} sm={6}>
														{dataBinding.ngay_ket_thuc_tam_giam_2 ? (
															<Form.Item
																name="ngay_ket_thuc_tam_giam_2"
																label="Ng??y k???t th??c t???m giam 2"
															>
																<MyDatePicker format="DD/MM/YYYY" />
															</Form.Item>
														) : (
															<Button
																type="link"
																onClick={() =>
																	setDataUpdate({
																		visible: true,
																		source: 'ngay_ket_thuc_tam_giam_1',
																		destination: 'ngay_ket_thuc_tam_giam_2',
																	})
																}
															>
																Ng??y k???t th??c t???m giam 2
															</Button>
														)}
													</Col>
												)}
											</>
										)}
									</>
								)}
							</Row>
						</>
					)}
				</Collapse.Panel>
			</Collapse>
			<Modal
				visible={dataUpdate.visible}
				title="C???p nh???t"
				onCancel={() => setDataUpdate({ visible: false })}
				onOk={onSubmitDataInternal}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="so_ngay"
						label="S??? ng??y thay ?????i"
						tooltip="V?? d???: nh???p 210 hay 2 _ 10 t????ng ??????ng v???i 2 th??ng 10 ng??y"
					>
						<InputNumber
							placeholder="Theo ?????nh d???ng mm _ dd"
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
