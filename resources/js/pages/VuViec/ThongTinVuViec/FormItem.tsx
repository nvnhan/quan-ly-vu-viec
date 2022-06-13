import Select from 'antd/lib/select';
import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import InputNumber from 'antd/lib/input-number/index';
import Input from 'antd/lib/input/index';
import React from 'react';
import { inputFormat, inputParse } from '../../../utils';
import { required } from '../../../utils/rules';

const form = () => {
	const phanLoaiTin = ['Tố giác về tội phạm', 'Tin báo về tội phạm', 'Kiến nghị khởi tố', 'CQĐT trực tiếp phát hiện'];
	return (
		<Row gutter={[10, 5]}>
			<Col span={24} sm={12}>
				<Form.Item name="ten_vu_viec" label="Tên vụ việc" rules={[required]}>
					<Input />
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
					<Select>
						{phanLoaiTin.map((pl) => (
							<Select.Option value={pl}>{pl}</Select.Option>
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
				<Form.Item name="id_dp_xay_ra" label="Địa phương xảy ra">
					<Input />
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

export default form;
