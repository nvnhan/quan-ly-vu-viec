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
import { fetchToiDanh } from '../../../../reducers/toiDanh';
import { Model } from '../../../../reducers/type';
import { RootState } from '../../../../store';
import { LOAI_TOI_PHAM, TRUONG_HOP_BAT, TU_CACH_TO_TUNG } from '../../../../utils/constant';
import { required } from '../../../../utils/rules';

const form = (props: { form?: FormInstance<any>; vuViec: Model.VuViec; record: any }) => {
	const dispatch = useDispatch();
	const toiDanh = useSelector((state: RootState) => state.toiDanh);
	const { vuViec } = props;
	const [biCan, setBiCan] = useState(false);

	useEffect(() => {
		toiDanh.status === 'idle' && dispatch(fetchToiDanh());
	}, []);

	useEffect(() => {
		onChangeTuCachToTung(props.record?.tu_cach_to_tung);
	}, [props.record]);

	const onChangeTuCachToTung = (val: any) => setBiCan(val <= 6);

	const onChangeNgayTamGiam = (val: moment.Moment) => {
		let thoi_han_giam = 120;
		if (vuViec.loai_toi_pham === LOAI_TOI_PHAM.IT_NGHIEM_TRONG) thoi_han_giam = 60;
		else if (vuViec.loai_toi_pham === LOAI_TOI_PHAM.NGHIEM_TRONG) thoi_han_giam = 90;
		const so_ngay_tam_giu = props.form?.getFieldValue('so_ngay_tam_giu') ?? 0;
		const so_ngay_tam_giu_1 = props.form?.getFieldValue('so_ngay_tam_giu_1') ?? 0;
		const so_ngay_tam_giu_2 = props.form?.getFieldValue('so_ngay_tam_giu_2') ?? 0;

		props.form?.setFieldsValue({
			ngay_ket_thuc_tam_giam: val
				.clone()
				.add(thoi_han_giam - so_ngay_tam_giu - so_ngay_tam_giu_1 - so_ngay_tam_giu_2 - 1, 'days'),
		});
	};

	return (
		<Collapse defaultActiveKey="ttvt">
			<Collapse.Panel header="Thông tin liên quan đến vụ việc" key="ttvt">
				<Row gutter={[12, 0]}>
					<Col span={12} sm={6}>
						<Form.Item name="tu_cach_to_tung" label="Tư cách tố tụng" rules={[required]}>
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
								<Form.Item name="hanh_vi" label="Hành vi">
									<Input />
								</Form.Item>
							</Col>
							<Col span={12} sm={6}>
								<Form.Item name="ngay_xay_ra_bc" label="Ngày xảy ra">
									<MyDatePicker format="DD/MM/YYYY" />
								</Form.Item>
							</Col>
							<Col span={12} sm={6}>
								<Form.Item name="noi_xay_ra_bc" label="Nơi xảy ra">
									<Input />
								</Form.Item>
							</Col>
						</>
					)}

					<Col span={24}>
						<Form.Item name="loi_khai" label="Lời khai">
							<Input.TextArea rows={8} />
						</Form.Item>
					</Col>

					{biCan && (
						<>
							<Col span={12} sm={6}>
								<Form.Item name="ngay_khoi_to_bc" label="Ngày khởi tố">
									<MyDatePicker format="DD/MM/YYYY" />
								</Form.Item>
							</Col>
							<Col span={12} sm={6}>
								<Form.Item name="ma_toi_danh_bc" label="Tội danh">
									<Select allowClear showSearch>
										{toiDanh.list.map((td) => (
											<Select.Option value={td.id} key={td.id}>
												Điều {td.id} {td.value}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={12} sm={6}>
								<Form.Item name="ngay_bat" label="Ngày bắt">
									<MyDatePicker format="DD/MM/YYYY" />
								</Form.Item>
							</Col>
							<Col span={12} sm={6}>
								<Form.Item name="truong_hop_bat" label="Trường hợp bắt">
									<Select allowClear>
										{TRUONG_HOP_BAT.map((th, index) => (
											<Select.Option value={th} key={index}>
												{th}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>

							<Col span={12} sm={6}>
								<Form.Item name="ngay_tam_giu" label="Ngày tạm giữ">
									<MyDatePicker format="DD/MM/YYYY" />
								</Form.Item>
							</Col>
							<Col span={12} sm={6}>
								<Form.Item name="so_ngay_tam_giu" label="Số ngày tạm giữ">
									<InputNumber style={{ width: '100%' }} min={0} step={1} max={3} />
								</Form.Item>
							</Col>
							<Col span={12} sm={6}>
								<Form.Item name="so_ngay_tam_giu_1" label="Số ngày tạm giữ 1">
									<InputNumber style={{ width: '100%' }} min={0} step={1} max={3} />
								</Form.Item>
							</Col>
							<Col span={12} sm={6}>
								<Form.Item name="so_ngay_tam_giu_2 " label="Số ngày tạm giữ 2">
									<InputNumber style={{ width: '100%' }} min={0} step={1} max={3} />
								</Form.Item>
							</Col>

							<Col span={12} sm={6}>
								<Form.Item name="ngay_tam_giam" label="Ngày tạm giam">
									<MyDatePicker onChange={onChangeNgayTamGiam} format="DD/MM/YYYY" />
								</Form.Item>
							</Col>
							<Col span={12} sm={6}>
								<Form.Item name="ngay_ket_thuc_tam_giam" label="Ngày kết thúc tạm giam">
									<MyDatePicker format="DD/MM/YYYY" />
								</Form.Item>
							</Col>
							<Col span={12} sm={6}>
								<Form.Item name="ngay_ket_thuc_tam_giam_1" label="Ngày kết thúc tạm giam 1">
									<MyDatePicker format="DD/MM/YYYY" />
								</Form.Item>
							</Col>
							<Col span={12} sm={6}>
								<Form.Item name="ngay_ket_thuc_tam_giam_2" label="Ngày kết thúc tạm giam 2">
									<MyDatePicker format="DD/MM/YYYY" />
								</Form.Item>
							</Col>
						</>
					)}
				</Row>
			</Collapse.Panel>
		</Collapse>
	);
};

export default form;
