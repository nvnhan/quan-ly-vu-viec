import UploadOutlined from '@ant-design/icons/UploadOutlined';
import Button from 'antd/lib/button/index';
import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import message from 'antd/lib/message/index';
import Modal from 'antd/lib/modal/index';
import Upload from 'antd/lib/upload/index';
import axios from 'axios';
import React, { useState } from 'react';
import FormWaiting from '../../../components/Includes/FormWaiting';
import { parseValues, useMergeState } from '../../../utils';
import FormItem from './FormItem';
import ModalPreview from './ModalPreview';

const index = () => {
	const [form] = Form.useForm();

	const [columns, setColumns] = useState(() => {
		let cols = {};
		// Get data from localStorage
		const cot = localStorage.getItem('cot_excel_bldd');
		if (cot) Object.assign(cols, JSON.parse(cot));
		//
		return cols;
	});
	const [fileList, setFileList] = useState<any[]>([]);
	const [modalPreview, setModalPreview] = useMergeState({
		visible: false,
		tenFile: '',
	});

	/**
	 * Lưu thông tin cột vào localStorage
	 */
	const saveColumns = (cols: { [index: string]: string }) => {
		delete cols.file;
		localStorage.setItem('cot_excel_bldd', JSON.stringify(cols));
	};

	const getFormData = (values: { [index: string]: any }) => {
		delete values.file;
		values = parseValues(values);

		const data = new FormData();
		data.append('file', fileList[0]);

		for (let key in values) values[key] !== undefined && data.append(key, values[key]);
		return data;
	};

	const onFinish = () => {
		if (fileList.length === 0) {
			message.warn('Chưa chọn file');
			return;
		}
		FormWaiting();
		const values = form.getFieldsValue();
		saveColumns({ ...values });
		const data = getFormData(values);

		// Truyền lên server
		axios
			.post(`/api/dinh-danh/them-file`, data, {
				headers: {
					'Content-Type':
						'multipart/form-data; charset=utf-8; boundary=' + Math.random().toString().substr(2),
				},
			})
			.then((response) => {
				if (response.data.success) {
					message.success(response.data.message);
					setModalPreview({ visible: true, tenFile: response.data.data });
				} else message.error(response.data.message);
			})
			.catch((error) => console.log(error))
			.then(() => Modal.destroyAll());
	};

	/**
	 * Cancel Modal preview
	 */
	const handleCancel = () => setModalPreview({ visible: false, tenFile: '' }) && setFileList([]);

	/**
	 * Remove selected file
	 */
	const onRemove = () => setFileList([]);

	const beforeUpload = (file: any) => {
		setFileList([file]);
		return false;
	};

	return (
		<div className="list-form" style={{ padding: '16px 12px' }}>
			<Form
				form={form}
				labelCol={{ span: 12 }}
				wrapperCol={{ span: 12 }}
				onFinish={onFinish}
				initialValues={columns}
			>
				<Row gutter={[12, 12]} style={{ marginLeft: 0, marginRight: 0 }}>
					<Col span={24} md={18}>
						<Form.Item labelCol={{ md: 4 }} wrapperCol={{ md: 20 }} name="file" label="Tập tin">
							<Upload
								accept=".xls,.xlsx"
								beforeUpload={beforeUpload}
								onRemove={onRemove}
								fileList={fileList}
							>
								<Button>
									<UploadOutlined /> Chọn file tải lên
								</Button>
							</Upload>
						</Form.Item>
					</Col>
				</Row>
				<FormItem />
			</Form>
			<ModalPreview
				tenFile={modalPreview.tenFile}
				handleCancel={handleCancel}
				modalVisible={modalPreview.visible}
			/>
		</div>
	);
};

export default React.memo(index);
