import Collapse from 'antd/lib/collapse';
import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import InputNumber from 'antd/lib/input-number';
import Input from 'antd/lib/input/index';
import Select from 'antd/lib/select';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyDatePicker from '../../../../components/Controls/MyDatePicker';
import MyDebounceSelect, { SelectValue } from '../../../../components/Controls/MyDebounceSelect';
import { fetchToiDanh } from '../../../../reducers/toiDanh';
import { RootState } from '../../../../store';
import { getSearchCanBo } from '../../../../utils/services';
import FormItem from '../../ThongTinVuViec/FormItem';

const form = () => {
	const dispatch = useDispatch();
	const toiDanh = useSelector((state: RootState) => state.toiDanh);

	useEffect(() => {
		toiDanh.status === 'idle' && dispatch(fetchToiDanh());
	}, []);

	const fetchCanBoList = async (q: string, type: string): Promise<SelectValue[]> => {
		return getSearchCanBo({ q, l: 7 }).then((body) =>
			body?.data?.data.map((item: any) => ({
				label: `${item.ho_ten} - ${item.ten_chuc_vu} ${item.ten_don_vi}`,
				value: item.id,
			}))
		);
	};

	return (
		<Collapse defaultActiveKey="ttbd">
			<Collapse.Panel key="ttbd" header="Thông tin ban đầu">
				<FormItem />
			</Collapse.Panel>

			<Collapse.Panel key="ttdt" header="Thông tin điều tra">
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
							<MyDatePicker format="DD/MM/YYYY" />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="ngay_ket_thuc_phuc_hoi" label="Ngày kết thúc phục hồi">
							<MyDatePicker format="DD/MM/YYYY" />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="ket_qua_giai_quyet" label="Kết quả giải quyết">
							<Select>
								<Select.Option value="Tạm đình chỉ">Tạm đình chỉ</Select.Option>
								<Select.Option value="Không khởi tố">Không khởi tố</Select.Option>
								<Select.Option value="Khởi tố">Khởi tố</Select.Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>
			</Collapse.Panel>

			<Collapse.Panel key="kt" header="Khởi tố">
				<Row gutter={[10, 5]}>
					<Col span={12} sm={6}>
						<Form.Item name="ngay_khoi_to" label="Ngày khởi tố">
							<MyDatePicker format="DD/MM/YYYY" />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="ma_toi_danh" label="Tội danh">
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
						<Form.Item name="loai_toi_pham" label="Loại tội phạm">
							<Select>
								<Select.Option value="Ít nghiêm trọng">Ít nghiêm trọng</Select.Option>
								<Select.Option value="Nghiêm trọng">Nghiêm trọng</Select.Option>
								<Select.Option value="Rất nghiêm trọng">Rất nghiêm trọng</Select.Option>
								<Select.Option value="Đặc biệt nghiêm trọng">Đặc biệt nghiêm trọng</Select.Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="thoi_han_dieu_tra" label="Thời hạn điều tra">
							<InputNumber style={{ width: '100%' }} />
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
						<Form.Item name="thoi_gian_gia_han" label="Thời gian gia hạn">
							<InputNumber style={{ width: '100%' }} />
						</Form.Item>
					</Col>
					<Col span={12} sm={6}>
						<Form.Item name="ket_qua_an" label="Kết quả án">
							<Select>
								<Select.Option value="Tạm đình chỉ">Tạm đình chỉ</Select.Option>
								<Select.Option value="Gia hạn">Gia hạn</Select.Option>
								<Select.Option value="Kết luận điều tra">Kết luận điều tra</Select.Option>
								<Select.Option value="Kết luận điều tra (bổ sung)">
									Kết luận điều tra (bổ sung)
								</Select.Option>
								<Select.Option value="Kết luận điều tra (lại)">Kết luận điều tra (lại)</Select.Option>
								<Select.Option value="Kết luận điều tra (đình chỉ)">
									Kết luận điều tra (đình chỉ)
								</Select.Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>
			</Collapse.Panel>

			<Collapse.Panel key="hs" header="Hồ sơ vụ việc">
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
