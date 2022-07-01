import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form/index';
import message from 'antd/lib/message/index';
import Spin from 'antd/lib/spin';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { parseValues } from '../../../utils';
import { getApi, putApi } from '../../../utils/services';
import FormItem from './FormItem';

const NguoiChiTiet = () => {
	const [form] = Form.useForm();
	// const [record, setRecord] = useState<{ [key: string]: any }>({});
	const [loading, setLoading] = useState(true);
	const [formSubmitting, setFormSubmitting] = useState(false);
	const authUser = useSelector((state: RootState) => state.authUserReducer);
	const id = window.location.pathname.split('/').pop();

	useEffect(() => {
		setLoading(true);

		getApi('nguoi/' + id)
			.then((response) => {
				if (response.data.success) {
					// setRecord(response.data.data);
					form.setFieldsValue(response.data.data);
				}
			})
			.finally(() => setLoading(false));
	}, []);

	const onFinish = (values: any) => {
		setFormSubmitting(true);

		putApi('nguoi/' + id, parseValues(values))
			.then((response) => {
				if (response.data.success) {
					setFormSubmitting(false);
					message.success(response.data.message);
				} else message.error(response.data.message);
			})
			.catch((error) => console.log(error))
			.then(() => setFormSubmitting(false));
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
						<FormItem />
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

							<Button>
								<UnorderedListOutlined />
								Vụ việc liên quan
							</Button>
						</div>
					</Form>
				</Spin>
			</div>
		</div>
	);
};

export default React.memo(NguoiChiTiet);
