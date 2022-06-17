import Divider from 'antd/lib/divider';
import Button from 'antd/lib/button/index';
import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import message from 'antd/lib/message/index';
import React, { useEffect } from 'react';
import { getCaiDat, getSearchQuanHuyen, putCaiDat } from '../../../utils/services';
import MyDebounceSelect, { SelectValue } from '../../../components/Controls/MyDebounceSelect';

const index = () => {
	const [form] = Form.useForm();

	useEffect(() => {
		// Check it in server
		getCaiDat()
			.then((response: any) => {
				if (response.data.success) form.setFieldsValue(response.data.data);
				else message.warn(response.data.message);
			})
			.catch((error) => console.log(error));
	}, []);

	const onFinish = () => {
		form.validateFields().then((values) =>
			putCaiDat(values)
				.then((response) => {
					if (response.data.success) message.success(response.data.message);
					else message.warn(response.data.message);
				})
				.catch((error) => console.log(error))
		);
	};

	const fetchUserList = async (username: string): Promise<SelectValue[]> => {
		return getSearchQuanHuyen({ q: username, l: 7 }).then((body) =>
			body?.data?.data.map((item: any) => ({
				label: item.ten_huyen_tinh,
				value: item.id,
			}))
		);
	};

	return (
		<div className="list-form">
			<Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
				<Divider orientation="left">Cài đặt đơn vị</Divider>
				<Row
					gutter={[12, 12]}
					// style={{
					// 	borderBottom: '1px solid rgba(0,0,0,.1)',
					// 	margin: '0 0 12px',
					// }}
				>
					<Col span={24} md={12}>
						<Form.Item name="quan_huyen" label="Địa phương sử dụng">
							<MyDebounceSelect
								placeholder="Chọn địa phương quận/huyện..."
								fetchOptions={fetchUserList}
							/>
						</Form.Item>
					</Col>
				</Row>
				{/* <Row gutter={[12, 12]}>
					<Col span={24} md={12}>
						<Form.Item name="thu_truong" label="Thủ trưởng đơn vị">
							<Input />
						</Form.Item>
					</Col>
					<Col span={24} md={12}>
						<Form.Item name="pho_thu_truong" label="Phó thủ trưởng">
							<Input />
						</Form.Item>
					</Col>
				</Row> */}

				<Row gutter={[12, 12]}>
					<Col span={24} md={12}>
						<Form.Item wrapperCol={{ md: { span: 16, offset: 8 } }}>
							<Button htmlType="submit" type="primary">
								Cập nhật
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default React.memo(index);
