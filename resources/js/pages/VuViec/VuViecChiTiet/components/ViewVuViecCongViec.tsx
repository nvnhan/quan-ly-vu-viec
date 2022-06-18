import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import PlusCircleFilled from '@ant-design/icons/PlusCircleFilled';
import Collapse from 'antd/lib/collapse';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Popconfirm from 'antd/lib/popconfirm';
import Spin from 'antd/lib/spin';
import axios from 'axios';
import { groupBy } from 'lodash';
import React, { useEffect } from 'react';
import { parseValues, unionDataBy, useMergeState } from '../../../../utils';
import { getApi } from '../../../../utils/services';
import FormVuViecCongViec from './FormVuViecCongViec';

const List = (props: { vuViec: any }) => {
	const [form] = Form.useForm();
	const [state, setState] = useMergeState({
		data: [],
		loading: true,
		record: null,
		modalVisible: false,
		formSubmitting: false,
	});
	const { data, loading, record, modalVisible, formSubmitting } = state;
	const { vuViec } = props;

	const handleInsert = () => {
		setState({ modalVisible: true, record: null });
		form.setFieldsValue({ muc_do_uu_tien: 1 });
	};

	const handleEdit = (record: any) => {
		setState({ modalVisible: true, record });
		form.setFieldsValue(record);
	};

	const handleDelete = (record: any) => {
		Modal.confirm({
			title: 'Đồng chí có chắc chắn xóa thông tin Công việc này?',
			icon: <ExclamationCircleOutlined />,
			content: 'Lưu ý: Thao tác không thể hoàn lại',
			okText: 'Xóa',
			okType: 'danger',
			cancelText: 'Hủy',
			onOk: () => {
				axios
					.delete(`/api/cong-viec/${record.id}`)
					.then((response) => {
						if (response.data.success) {
							const newData = data.filter((item: any) => item.id !== record.id);
							setState({
								data: newData,
							});
							message.info(response.data.message);
						}
					})
					.catch((error) => console.log(error));
			},
		});
	};

	const onSubmit = () => {
		form.validateFields().then((values) => {
			setState({ formSubmitting: true });
			if (!record) {
				axios
					.post(`/api/cong-viec`, parseValues({ ...values, id_vu_viec: vuViec.id }))
					.then((response: any) => {
						const mergedData = unionDataBy(data, response.data.data, 'id'); // New data is first line

						setState({
							record: null,
							data: mergedData,
							formSubmitting: false,
							modalVisible: false,
						});
						message.success(response.data.message);
					})
					.catch((error) => console.log(error));
			} else {
				axios
					.put(`/api/cong-viec/${record.id}`, parseValues(values))
					.then((response: any) => {
						const mergedData = unionDataBy(data, response.data.data, 'id'); // New data is first line

						setState({
							record: null,
							data: mergedData,
							formSubmitting: false,
							modalVisible: false,
						});
						message.success(response.data.message);
					})
					.catch((error) => console.log(error));
			}
		});
	};

	const onInsertAuto = () => {
		setState({ loading: true, formSubmitting: true });
		axios
			.post(`/api/cong-viec/khoi-tao`, { id_vu_viec: vuViec.id })
			.then((response) => {
				if (response.data.success) {
					setState({
						data: response.data.data,
						loading: false,
						formSubmitting: false,
					});
					message.success(response.data.message);
				}
			})
			.catch((error) => console.log(error));
	};

	const onCancel = () => setState({ modalVisible: false });

	useEffect(() => {
		getApi('cong-viec?vu_viec=' + vuViec.id)
			.then((response) => {
				if (response.data.success) {
					setState({ data: response.data.data, loading: false });
				}
			})
			.catch((error) => console.log(error));
	}, []);

	const groups = Object.entries(groupBy(data, 'ten_nhom_cong_viec'));

	return (
		<>
			<div className="tools-button">
				<Button type="primary" onClick={handleInsert}>
					<PlusCircleFilled /> Công việc mới
				</Button>
				{data.length === 0 && (
					<Popconfirm
						title="Tự động thêm các công việc đã khởi tạo sẵn?"
						onConfirm={onInsertAuto}
						okText="Thêm"
						cancelText="Hủy"
					>
						<Button loading={formSubmitting}>Thêm các công việc khởi tạo</Button>
					</Popconfirm>
				)}
			</div>

			<Spin spinning={loading}>
				{groups.map((group, index) => (
					<React.Fragment key={index}>
						<Divider orientation="left">{group[0]}</Divider>
						<Collapse expandIconPosition="end" bordered={false}>
							{group[1].map((cv, index) => (
								<Collapse.Panel header={index + 1 + '. ' + cv.ten_cong_viec} key={cv.id} extra={<></>}>
									{cv.ten_cong_viec}
								</Collapse.Panel>
							))}
						</Collapse>
					</React.Fragment>
				))}
			</Spin>

			<Modal
				visible={modalVisible}
				title={record !== undefined ? 'Chỉnh sửa' : 'Thêm mới'}
				onCancel={onCancel}
				footer={[
					<Button key="back" onClick={onCancel}>
						Hủy
					</Button>,
					<Button key="submit" type="primary" loading={formSubmitting} onClick={onSubmit}>
						Đồng ý
					</Button>,
				]}
			>
				<Form layout="vertical" form={form}>
					<FormVuViecCongViec />
				</Form>
			</Modal>
		</>
	);
};

export default React.memo(List);
