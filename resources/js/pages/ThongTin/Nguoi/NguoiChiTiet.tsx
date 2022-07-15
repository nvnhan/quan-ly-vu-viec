import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form/index';
import message from 'antd/lib/message/index';
import Spin from 'antd/lib/spin';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { parseValues } from '../../../utils';
import { getApi, postFormData } from '../../../utils/services';
import FormItem from './FormItem';

const NguoiChiTiet = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(true);
	const [formSubmitting, setFormSubmitting] = useState(false);
	const authUser = useSelector((state: RootState) => state.authUserReducer);
	const id = window.location.pathname.split('/').pop();
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	useEffect(() => {
		setLoading(true);

		getApi('nguoi/' + id)
			.then((response) => {
				if (response.data.success) {
					if (response.data.data.ten_file)
						setFileList([
							{
								url: '/storage/' + response?.data?.data?.ten_file,
								uid: '12',
								name: response?.data?.data?.ten_file,
							},
						]);
					form.setFieldsValue(response?.data?.data);
				}
			})
			.finally(() => setLoading(false));
	}, []);

	const onFinish = (values: any) => {
		setFormSubmitting(true);

		postFormData('nguoi/' + id, {
			...parseValues(values),
			file: { file: fileList.length > 0 ? fileList?.[0]?.originFileObj : null },
		})
			.then((response) => {
				if (response.data.success) {
					message.success(response.data.message);
					console.log('after success');
				} else message.error(response.data.message);
			})
			.catch((error) => console.log(error))
			.finally(() => setFormSubmitting(false));
	};

	return (
		<div className="list-form">
			<div className="filter-box">
				<Button onClick={() => window.history.back()} type="link">
					<ArrowLeftOutlined /> Quay lại
				</Button>
			</div>
			<div style={{ padding: '16px 10px' }}>
				<Spin spinning={loading}>
					<Form form={form} onFinish={onFinish} layout="vertical">
						<FormItem fileList={fileList} setFileList={setFileList} />
						<div className="tools-button" style={{ textAlign: 'center' }}>
							<Button onClick={() => window.history.back()}>
								<ArrowLeftOutlined /> Quay lại
							</Button>

							{authUser.quan_tri && (
								<Button htmlType="submit" type="primary" loading={formSubmitting}>
									<SaveOutlined />
									Lưu lại
								</Button>
							)}

							{/* <Button>
								<UnorderedListOutlined />
								Vụ việc liên quan
							</Button> */}
						</div>
					</Form>
				</Spin>
			</div>
		</div>
	);
};

export default React.memo(NguoiChiTiet);
