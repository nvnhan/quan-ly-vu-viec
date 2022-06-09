import Button from 'antd/lib/button/index';
import Divider from 'antd/lib/divider';
import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import React from 'react';

const form = () => (
	<>
		<Divider orientation="left">Định dạng file</Divider>
		<Row gutter={[12, 12]} style={{ marginLeft: 0, marginRight: 0 }}>
			<Col span={12} md={6}>
				<Form.Item name="cot_ho_ten" label="Cột tên khách">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12} md={6}>
				<Form.Item name="cot_gia_tien" label="Cột giá gốc">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12} md={6}>
				<Form.Item name="cot_gia_ban" label="Cột giá bán">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12} md={6}>
				<Form.Item name="cot_hang_bay" label="Cột hãng">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12} md={6}>
				<Form.Item name="cot_f1" label="Cột F1">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12} md={6}>
				<Form.Item name="cot_sdt" label="Cột SĐT">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12} md={6}>
				<Form.Item name="cot_ghi_chu" label="Cột ghi chú">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12} md={6}>
				<Form.Item name="xu_ly_tu_hang" label="Xử lý từ hàng">
					<Input />
				</Form.Item>
			</Col>
		</Row>
		<Row gutter={[12, 12]}>
			<Col span={12} md={6}>
				<Form.Item wrapperCol={{ offset: 12, span: 12 }}>
					<Button htmlType="submit" type="primary">
						Xử lý
					</Button>
				</Form.Item>
			</Col>
		</Row>
	</>
);

export default React.memo(form);
