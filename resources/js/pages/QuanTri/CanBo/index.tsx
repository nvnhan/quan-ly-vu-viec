import RetweetOutlined from '@ant-design/icons/RetweetOutlined';
import Button from 'antd/lib/button/index';
import Form from 'antd/lib/form/index';
import Input from 'antd/lib/input/index';
import message from 'antd/lib/message/index';
import Modal from 'antd/lib/modal/index';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ListForm, { ListFormRef } from '../../../components/ListForm';
import { ColumnProps } from '../../../components/ListForm/DataTable';
import FormItem from './FormItem';
import Divider from 'antd/lib/divider';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { RootState } from '../../../store';

const List = () => {
	const childRef = useRef<ListFormRef>(null);
	const authUser = useSelector((state: RootState) => state.authUserReducer);
	const [formReset] = Form.useForm();
	const [update, setUpdate] = useState({
		id: -1,
		modalVisible: false,
	});

	const columns: ColumnProps[] = [
		{
			title: 'Tài khoản',
			dataIndex: 'username',
			optFind: true,
			width: 90,
		},
		{
			title: 'Họ tên',
			dataIndex: 'ho_ten',
			optFind: true,
			width: 110,
		},
		{
			title: 'SĐT',
			dataIndex: 'sdt',
			width: 90,
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'dia_chi',
			ellipsis: true,
			width: 120,
		},
		{
			title: 'Số ĐD',
			dataIndex: 'so_dinh_danh',
			align: 'center',
			sorter: (a: number, b: number) => a - b,
			width: 60,
		},
		{
			title: 'Thêm dữ liệu',
			dataIndex: 'them_moi',
			align: 'center',
			width: 60,
			render: (bol: boolean, record: object) => (
				<Checkbox checked={bol} onChange={(e: any) => onChangeInsertCheckbox(e.target.checked, record)} />
			),
		},
		{
			title: 'Phân quyền',
			dataIndex: 'quyen',
			optFilter: true,
			width: 80,
			render: (text: string) => {
				let color = '';
				switch (text) {
					case 'Người dùng':
						color = 'gray';
						break;
					case 'Quản lý đại lý':
						color = 'green';
						break;
					default:
						color = 'volcano';
						break;
				}

				return <b color={color}>{text}</b>;
			},
		},
		// {
		// 	title: 'Hoạt động',
		// 	dataIndex: 'actived',
		// 	render: (bol: boolean) => <Checkbox checked={bol} />,
		// 	width: 70,
		// },
		{
			title: 'Ngày tạo',
			dataIndex: 'created_at',
			width: 80,
		},
	];

	const onChangeInsertCheckbox = (check: boolean, record: any) => {
		// console.log(check, record);
		axios
			.put(`/api/sua-them-moi/` + record.id, { check })
			.then((response) => {
				if (childRef.current) childRef.current.triggerUpdate(response);
			})
			.catch((error) => console.log(error));
	};

	const onClickRow = (selectedKey: any) => {
		formReset.setFieldsValue({ pass: '123' });
		setUpdate({ id: selectedKey.id, modalVisible: true });
	};

	const otherAction = [
		{
			key: 'resetPassword',
			onClick: onClickRow,
			title: 'Đặt lại mật khẩu',
			icon: <RetweetOutlined />,
			color: '#4bab92', // Primary color
		},
	];

	const handleOk = () => {
		formReset.validateFields().then((values) =>
			axios
				.put(`/api/reset/` + update.id, values)
				.then((response) => {
					if (response.data.success) {
						message.success(response.data.message);
						setUpdate({ id: -1, modalVisible: false });
					} else message.warn(response.data.message);
				})
				.catch((error) => console.log(error))
		);
	};

	const handleCancel = () => setUpdate({ id: -1, modalVisible: false });

	return (
		<>
			<ListForm
				ref={childRef}
				url="nguoi-dung"
				columns={columns}
				tableSize={{ x: 1100 }}
				modalWidth={800}
				formTemplate={<FormItem quanTri={authUser.admin} />}
				otherActions={authUser.admin ? otherAction : []}
				formInitialValues={{
					phan_quyen: 0,
					actived: true,
				}}
			/>
			<Modal
				title="Khôi phục mật khẩu cho user"
				onCancel={handleCancel}
				onOk={handleOk}
				visible={update.modalVisible}
				footer={[
					<Button key="back" onClick={handleCancel}>
						Hủy
					</Button>,
					<Button key="submit" type="primary" onClick={handleOk}>
						Đồng ý
					</Button>,
				]}
			>
				<Form
					form={formReset}
					labelCol={{ span: 8 }}
					wrapperCol={{
						span: 16,
					}}
				>
					<Form.Item name="pass" label="Mật khẩu mới" extra="Đặt lại mật khẩu mặc định là '123'">
						<Input disabled />
					</Form.Item>
					<Divider orientation="left">Xác nhận quyền quản trị viên</Divider>
					<Form.Item
						name="password"
						label="Mật khẩu của bạn"
						rules={[
							{
								required: true,
								message: 'Nhập đầy đủ thông tin!',
							},
						]}
					>
						<Input.Password />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default React.memo(List);
