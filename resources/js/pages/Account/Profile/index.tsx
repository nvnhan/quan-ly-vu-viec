import Button from 'antd/lib/button/index';
import Checkbox from 'antd/lib/checkbox/index';
import Divider from 'antd/lib/divider';
import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import message from 'antd/lib/message/index';
import Select from 'antd/lib/select/index';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../../reducers/authUser';
import { RootState } from '../../../store';
import { getUser, updateProfile } from '../../../utils/services';

const Profile = () => {
	const authUser = useSelector((state: RootState) => state.authUserReducer);
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	useEffect(() => {
		getUser()
			.then((response) => {
				if (response.data.success) {
					const { data } = response.data;
					form.setFieldsValue(data);
				} else message.warn(response.data.message);
			})
			.catch((error) => console.log(error));
	}, []);

	const onFinish = () => {
		const values = form.getFieldsValue();
		updateProfile(values)
			.then((response) => {
				if (response.data.success) {
					message.success(response.data.message);
					dispatch(setAuth(response.data.data));
				} else message.warn(response.data.message);
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="list-form">
			<Form
				form={form}
				onFinish={onFinish}
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
			>
				<Divider orientation="left">Thông tin cá nhân</Divider>
				<Row gutter={[12, 12]} style={{ marginLeft: 0, marginRight: 0 }}>
					<Col span={12}>
						<Form.Item name="username" label="Tên đăng nhập">
							<Input disabled />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name="ho_ten"
							label="Họ tên"
							rules={[
								{
									required: true,
									message: 'Nhập đầy đủ thông tin!',
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="sdt" label="Số điện thoại">
							<Input />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="dia_chi" label="Địa chỉ">
							<Input />
						</Form.Item>
					</Col>
				</Row>

				<Divider orientation="left">Cài đặt hiển thị</Divider>
				<Row gutter={[12, 12]} style={{ marginLeft: 0, marginRight: 0 }}>
					<Col span={24} md={12}>
						<Form.Item
							name="so_ket_qua"
							label="Số kết quả"
							tooltip="Số dòng hiển thị mặc định trên 1 trang"
						>
							<Select>
								<Select.Option value="10">10</Select.Option>
								<Select.Option value="20">20</Select.Option>
								<Select.Option value="50">50</Select.Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>
				{authUser.admin && (
					<>
						<Divider orientation="left">Cài đặt chung</Divider>
						<Row gutter={[12, 12]} style={{ marginLeft: 0, marginRight: 0 }}>
							<Col span={24} md={12}>
								<Form.Item
									name="default_insert"
									wrapperCol={{ sm: { offset: 8, span: 16 } }}
									valuePropName="checked"
								>
									<Checkbox>Quyền thêm mới mặc định</Checkbox>
								</Form.Item>
							</Col>
						</Row>
					</>
				)}

				<Row gutter={[12, 12]}>
					<Col span={24} md={12}>
						<Form.Item
							wrapperCol={{
								span: 16,
								offset: 8,
							}}
						>
							<Button type="primary" htmlType="submit">
								Cập nhật
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default React.memo(Profile);
