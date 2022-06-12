import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import InputNumber from 'antd/lib/input-number/index';
import Input from 'antd/lib/input/index';
import React from 'react';
import { inputFormat, inputParse } from '../../utils';

const form = () => {
	return (
		<Row gutter={[5, 5]}>
			<Col span={12}>
				<Form.Item
					name="ho_ten"
					label="Tên khách"
					rules={[
						{
							required: true,
							message: 'Không được bỏ trống',
						},
					]}
				>
					<Input />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="gia_tien" label="Giá gốc">
					<InputNumber
						style={{ width: '100%' }}
						min={1000}
						step={1000}
						formatter={inputFormat}
						parser={inputParse}
					/>
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="gia_ban" label="Giá bán">
					<InputNumber
						style={{ width: '100%' }}
						min={1000}
						step={1000}
						formatter={inputFormat}
						parser={inputParse}
					/>
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="hang_bay" label="Hãng bay">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="f1" label="F1">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="sdt" label="SĐT">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="ghi_chu" label="Ghi chú">
					<Input />
				</Form.Item>
			</Col>
		</Row>
	);
};

export default form;
