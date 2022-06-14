import LockOutlined from '@ant-design/icons/LockOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import Button from 'antd/lib/button/index';
import Form from 'antd/lib/form/index';
import Input from 'antd/lib/input/index';
import message from 'antd/lib/message/index';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postLogin } from '../../../utils/services';

interface ComponentProps {
	onSetAuth: (user: Model.User) => void;
	onRegister: () => void;
}

const LoginForm = ({ onSetAuth, onRegister }: ComponentProps) => {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [formSubmiting, setSubmiting] = useState(false);

	const onFinish = () => {
		setSubmiting(true);
		const values = form.getFieldsValue();

		postLogin(values)
			.then((response) => {
				if (response.data.success) {
					const { data } = response.data;

					localStorage.setItem('token', data.token);
					localStorage.setItem('id', data.id);
					message.success(response.data.message);

					// Setup default config for axios
					axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
					// Add a response interceptor
					axios.interceptors.response.use(undefined, (error) => {
						if (error.response.status === 401) {
							message.warn('Thất bại. Vui lòng đăng nhập lại!');
							// this.props.onLogout();
						}
						return Promise.reject(error);
					});
					onSetAuth(data);
				} else {
					message.warn(response.data.message);
					setSubmiting(false);
				}
			})
			.catch((error) => {
				console.log(error);
				setSubmiting(false);
			});
	};

	const contactAdmin = () => message.info('Liên hệ quản trị viên hệ thống');

	return (
		<Form
			form={form}
			name="normal_login"
			className="login-form"
			initialValues={{ remember: true }}
			onFinish={onFinish}
		>
			<Form.Item
				name="ten_dang_nhap"
				rules={[
					{
						required: true,
						message: 'Nhập tên đăng nhập!',
					},
				]}
			>
				<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
			</Form.Item>
			<Form.Item
				name="mat_khau"
				rules={[
					{
						required: true,
						message: 'Nhập mật khẩu!',
					},
				]}
			>
				<Input.Password
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="Mật khẩu"
				/>
			</Form.Item>
			<Form.Item>
				<Link className="login-form-forgot" onClick={contactAdmin} to="">
					Quên mật khẩu?
				</Link>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" className="login-form-button" loading={formSubmiting}>
					Đăng nhập
				</Button>
				{/* Hoặc{' '}
				<Link onClick={() => onRegister()} to="">
					đăng ký tài khoản!
				</Link> */}
			</Form.Item>
		</Form>
	);
};

export default React.memo(LoginForm);
