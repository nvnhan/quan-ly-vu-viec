import Checkbox from 'antd/lib/checkbox/index';
import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import InputNumber from 'antd/lib/input-number/index';
import Input from 'antd/lib/input/index';
import Select from 'antd/lib/select/index';
import React from 'react';
const { Option } = Select;

interface Props {
	quanTri?: boolean;
}
const form = ({ quanTri = false }: Props) => {
	const getRoleDetail = () => {
		return (
			<>
				<Option value={0}>Người dùng</Option>
				{quanTri && (
					<>
						<Option value={9}>Quản trị hệ thống</Option>
					</>
				)}
			</>
		);
	};

	return (
		<Row gutter={[5, 5]}>
			<Col span={12}>
				<Form.Item
					name="username"
					label="Tài khoản"
					tooltip="Không thể thay đổi sau khi thêm mới"
					rules={[
						{
							required: true,
							pattern: new RegExp(/^[a-z0-9\._]+$/g),
							message: 'Tài khoản bao gồm chữ cái thường, số, ký tự . và _',
						},
					]}
				>
					<Input />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="phan_quyen" label="Phân quyền">
					<Select>{getRoleDetail()}</Select>
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="ho_ten" label="Họ tên" rules={[{ required: true, message: 'Nhập đầy đủ thông tin!' }]}>
					<Input />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item
					name="email"
					label="Email"
					rules={[
						{
							type: 'email',
							message: 'Không đúng định dạng E-mail!',
						},
					]}
				>
					<Input />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="dia_chi" label="Địa chỉ">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item wrapperCol={{ sm: { offset: 8, span: 16 } }} name="them_moi" valuePropName="checked">
					<Checkbox>Quyền thêm mới</Checkbox>
				</Form.Item>
			</Col>
			{/* <Col span={12}>
				<Form.Item wrapperCol={{ sm: { offset: 8, span: 16 } }} name="them_file" valuePropName="checked">
					<Checkbox>Quyền thêm từ file</Checkbox>
				</Form.Item>
			</Col> */}
		</Row>
	);
};

export default form;
