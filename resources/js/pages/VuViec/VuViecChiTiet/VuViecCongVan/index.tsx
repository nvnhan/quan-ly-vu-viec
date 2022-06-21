import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import Select from 'antd/lib/select';
import React from 'react';
import MyDatePicker from '../../../../components/Controls/MyDatePicker';
import MyDebounceSelect, { SelectValue } from '../../../../components/Controls/MyDebounceSelect';
import { required } from '../../../../utils/rules';
import { getSearchXaPhuong } from '../../../../utils/services';

const ViewVuViecCongVan = () => {
	const phanLoaiTin = ['Tố giác về tội phạm', 'Tin báo về tội phạm', 'Kiến nghị khởi tố', 'CQĐT trực tiếp phát hiện'];

	const fetchUnitList = async (q: string): Promise<SelectValue[]> => {
		console.log('fetching user', q);

		return getSearchXaPhuong({ q, l: 7 }).then((body) =>
			body?.data?.data.map((item: any) => ({
				label: `${item.ten_don_vi} - ${item.ten_dia_phuong}`,
				value: item.id,
			}))
		);
	};

	return (
		<Row gutter={[10, 5]}>
			<Col span={12} sm={6}>
				<Form.Item name="ngay_ca_phuong" label="Ngày CA phường tiếp nhận">
					<MyDatePicker format="DD/MM/YYYY" />
				</Form.Item>
			</Col>
			<Col span={12} sm={6}>
				<Form.Item name="ngay_cqdt" label="Ngày CQĐT tiếp nhận">
					<MyDatePicker format="DD/MM/YYYY" />
				</Form.Item>
			</Col>
			<Col span={24} sm={12}>
				<Form.Item name="ten_vu_viec" label="Tên vụ việc" rules={[required]}>
					<Input placeholder="Thời gian, địa điểm xảy ra, người liên quan, mô tả ngắn gọn..." />
				</Form.Item>
			</Col>
			<Col span={12} sm={6}>
				<Form.Item name="loai_vu_viec" label="Phân loại" rules={[required]}>
					<Select>
						<Select.Option value="AĐ">AĐ</Select.Option>
						<Select.Option value="AK">AK</Select.Option>
					</Select>
				</Form.Item>
			</Col>
			<Col span={12} sm={6}>
				<Form.Item name="phan_loai_tin" label="Phân loại tin">
					<Select allowClear>
						{phanLoaiTin.map((pl) => (
							<Select.Option value={pl} key={pl}>
								{pl}
							</Select.Option>
						))}
					</Select>
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
						placeholder="Chọn địa phương xã/phường..."
						fetchOptions={fetchUnitList}
						allowClear
					/>
				</Form.Item>
			</Col>
			<Col span={24} sm={12}>
				<Form.Item name="noi_dung_tom_tat" label="Nội dung tóm tắt">
					<Input.TextArea />
				</Form.Item>
			</Col>
		</Row>
	);
};

export default ViewVuViecCongVan;
