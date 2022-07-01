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
import { RootState } from '../../../../store';
import { inputNgayThangFormat, inputParse } from '../../../../utils';
import { TRUONG_HOP_BAT, TU_CACH_TO_TUNG, TU_CACH_TO_TUNG_KHOI_TO } from '../../../../utils/constant';
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

	const onChangeTuCachToTung = (val: any) => setBiCan(val === 2);

	return (
		<Collapse defaultActiveKey="ttvt">
			<Collapse.Panel header="Thông tin liên quan đến vụ việc" key="ttvt">
				<Row gutter={[12, 0]}>
					<Col span={12} sm={6}>
						<Form.Item name="tu_cach_to_tung" label="Tư cách tố tụng" rules={[required]}>
							<Select onChange={onChangeTuCachToTung}>
								{(vuViec.loai_vu_viec === 'AĐ' ? TU_CACH_TO_TUNG : TU_CACH_TO_TUNG_KHOI_TO).map(
									(item) => (
										<Select.Option value={item.id} key={item.id}>
											{item.label}
										</Select.Option>
									)
								)}
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
							<Col span={6} sm={3}>
								<Form.Item
									name="thoi_han_gia_han_tam_giu_1"
									label="Gia hạn TG 1"
									tooltip="Ví dụ: nhập 210 hay 2 _ 10 tương đương với 2 tháng 10 ngày"
								>
									<InputNumber
										style={{ width: '100%' }}
										formatter={inputNgayThangFormat}
										parser={inputParse}
									/>
								</Form.Item>
							</Col>
							<Col span={6} sm={3}>
								<Form.Item
									name="thoi_han_gia_han_tam_giu_2"
									label="Gia hạn TG 2"
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
								<Form.Item name="ngay_tam_giam" label="Ngày tạm giam">
									<MyDatePicker format="DD/MM/YYYY" />
								</Form.Item>
							</Col>
							<Col span={12} sm={6}>
								<Form.Item
									name="thoi_han_giam"
									label="Thời hạn tạm giam"
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
								<Form.Item name="ngay_gia_han_tam_giam_1" label="Ngày gia hạn tạm giam 1">
									<MyDatePicker format="DD/MM/YYYY" />
								</Form.Item>
							</Col>
							<Col span={12} sm={6}>
								<Form.Item
									name="thoi_han_gia_han_giam_1"
									label="Thời hạn GH tạm giam 1"
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
								<Form.Item name="ngay_gia_han_tam_giam_2" label="Ngày gia hạn tạm giam 2">
									<MyDatePicker format="DD/MM/YYYY" />
								</Form.Item>
							</Col>
							<Col span={12} sm={6}>
								<Form.Item
									name="thoi_han_gia_han_giam_2"
									label="Thời hạn GH tạm giam 2"
									tooltip="Ví dụ: nhập 210 hay 2 _ 10 tương đương với 2 tháng 10 ngày"
								>
									<InputNumber
										style={{ width: '100%' }}
										formatter={inputNgayThangFormat}
										parser={inputParse}
									/>
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
