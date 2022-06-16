import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import FormOutlined from '@ant-design/icons/FormOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import OrderedListOutlined from '@ant-design/icons/OrderedListOutlined';
import PaperClipOutlined from '@ant-design/icons/PaperClipOutlined';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form/index';
import message from 'antd/lib/message/index';
import Row from 'antd/lib/row';
import Spin from 'antd/lib/spin';
import Tabs from 'antd/lib/tabs';
import React, { useEffect, useState } from 'react';
import { parseValues } from '../../../utils';
import { getApi, putApi } from '../../../utils/services';
import FormChiTiet from './components/FormChiTiet';
import ViewVuViecCongVan from './components/ViewVuViecCongVan';
import ViewVuViecCongViec from './components/ViewVuViecCongViec';
import ViewVuViecNguoi from './components/ViewVuViecNguoi';
import ViewVuViecTaiLieu from './components/ViewVuViecTaiLieu';

const VuViecChiTiet = () => {
	const [form] = Form.useForm();
	const [record, setRecord] = useState<{ [key: string]: any }>({});
	const [loading, setLoading] = useState(true);
	const [formSubmitting, setFormSubmitting] = useState(false);
	const [currentTab, setCurrentTab] = useState<
		'Thông tin chi tiết' | 'Tác nhân liên quan' | 'Tài liệu báo cáo' | 'Công văn' | 'Công việc'
	>('Thông tin chi tiết');
	const id = window.location.pathname.split('/').pop();

	useEffect(() => {
		setLoading(true);

		getApi('vu-viec/' + id).then((response) => {
			if (response.data.success) {
				setRecord(response.data.data);
				form.setFieldsValue(response.data.data);
				setLoading(false);
			}
		});
	}, []);

	const onFinish = (values: any) => {
		setFormSubmitting(true);

		putApi('vu-viec/' + id, parseValues(values))
			.then((response) => {
				if (response.data.success) {
					setFormSubmitting(false);
					setRecord(response.data.data);
					message.success(response.data.message);
				} else message.error(response.data.message);
			})
			.catch((error) => console.log(error))
			.then(() => setFormSubmitting(false));
	};

	const onChange = (tab: any) => setCurrentTab(tab);

	return (
		<div className="list-form">
			<div className="filter-box">
				<Button onClick={() => window.history.back()} type="link">
					<ArrowLeftOutlined /> Quay lại
				</Button>
				<b style={{ fontSize: '1.15rem' }}>Vụ: {record.ten_vu_viec}</b>
			</div>

			<div style={{ padding: '16px 12px' }}>
				<Row>
					<Col span={24} sm={12}>
						<b>Thời điểm xảy ra:</b> {record.thoi_diem_xay_ra}, tại: {record.noi_xay_ra}
					</Col>
					<Col span={24} sm={12}>
						<b>Nội dung tóm tắt:</b> {record.noi_dung_tom_tat}
					</Col>
				</Row>
			</div>

			<Tabs type="card" onChange={onChange} defaultActiveKey={currentTab}>
				<Tabs.TabPane
					tab={
						<span>
							<FormOutlined />
							Thông tin chi tiết
						</span>
					}
					key="Thông tin chi tiết"
				/>
				<Tabs.TabPane
					tab={
						<span>
							<TeamOutlined />
							Tác nhân liên quan
						</span>
					}
					key="Tác nhân liên quan"
				/>
				<Tabs.TabPane
					tab={
						<span>
							<OrderedListOutlined />
							Công việc
						</span>
					}
					key="Công việc"
				/>
				<Tabs.TabPane
					tab={
						<span>
							<PaperClipOutlined />
							Tài liệu báo cáo
						</span>
					}
					key="Tài liệu báo cáo"
				/>
				<Tabs.TabPane
					tab={
						<span>
							<MailOutlined />
							Công văn
						</span>
					}
					key="Công văn"
				/>
			</Tabs>

			<div style={{ padding: '0 12px' }}>
				<Spin spinning={loading}>
					{currentTab === 'Thông tin chi tiết' && (
						<Form form={form} onFinish={onFinish} layout="vertical">
							<FormChiTiet />
							<div className="tools-button" style={{ textAlign: 'center' }}>
								<Button onClick={() => window.history.back()}>
									<ArrowLeftOutlined /> Quay lại
								</Button>
								<Button htmlType="submit" type="primary" loading={formSubmitting}>
									<SaveOutlined />
									Lưu lại
								</Button>
							</div>
						</Form>
					)}
					{currentTab === 'Tác nhân liên quan' && <ViewVuViecNguoi />}
					{currentTab === 'Công việc' && <ViewVuViecCongViec />}
					{currentTab === 'Tài liệu báo cáo' && <ViewVuViecTaiLieu />}
					{currentTab === 'Công văn' && <ViewVuViecCongVan />}
				</Spin>
			</div>
		</div>
	);
};

export default React.memo(VuViecChiTiet);