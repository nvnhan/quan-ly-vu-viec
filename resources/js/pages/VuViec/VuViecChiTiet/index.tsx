import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import FileWordOutlined from '@ant-design/icons/FileWordOutlined';
import FormOutlined from '@ant-design/icons/FormOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import OrderedListOutlined from '@ant-design/icons/OrderedListOutlined';
import PaperClipOutlined from '@ant-design/icons/PaperClipOutlined';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import Alert from 'antd/lib/alert';
import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form/index';
import message from 'antd/lib/message';
import Row from 'antd/lib/row';
import Spin from 'antd/lib/spin';
import Tabs from 'antd/lib/tabs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Model } from '../../../reducers/type';
import { RootState } from '../../../store';
import { parseValues } from '../../../utils';
import { getApi, putApi } from '../../../utils/services';
import FormChiTiet from './components/FormChiTiet';
import VuViecBieuMau from './VuViecBieuMau';
import VuViecCongVan from './VuViecCongVan';
import VuViecCongViec from './VuViecCongViec';
import VuViecNguoi from './VuViecNguoi';
import VuViecTaiLieu from './VuViecTaiLieu';

const VuViecChiTiet = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [record, setRecord] = useState<Model.VuViec>();
	const [loading, setLoading] = useState(true);
	const [formSubmitting, setFormSubmitting] = useState(false);
	const authUser = useSelector((state: RootState) => state.authUserReducer);

	const id = window.location.pathname.split('/').pop();
	const hash = window.location.hash.slice(1);
	const [currentTab, setCurrentTab] = useState<
		'thong-tin' | 'nguoi' | 'tai-lieu' | 'cong-van' | 'cong-viec' | 'bieu-mau' | string
	>(hash || 'thong-tin');

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

	/**
	 * Save form chi tiet
	 * @param values
	 */
	const onFinish = (values: any) => {
		setFormSubmitting(true);

		putApi('vu-viec/' + id, parseValues(values))
			.then((response) => {
				if (response.data.success) {
					setFormSubmitting(false);
					setRecord(response.data.data);
					form.setFieldsValue(response.data.data);
					message.success(response.data.message);
				} else message.error(response.data.message);
			})
			.catch((error) => console.log(error))
			.then(() => setFormSubmitting(false));
	};

	const onChangeTab = (tab: any) => {
		setCurrentTab(tab);
		window.location.hash = '#' + tab;
	};

	return (
		<div className="list-form">
			<div className="filter-box">
				<Button onClick={() => navigate('/vu-viec')} type="link">
					<ArrowLeftOutlined /> Quay lại
				</Button>
				{/* <b style={{ fontSize: '1.1rem' }}>
					{record?.loai_vu_viec === 'AĐ' ? 'Vụ việc: ' : 'Vụ án: '}
					{record?.ten_vu_viec}
				</b> */}
			</div>

			<div style={{ padding: '16px 12px' }}>
				<Row gutter={[12, 12]}>
					{record?.canh_bao && (
						<Col span={24}>
							<Alert message={record.canh_bao} type="error" showIcon />
						</Col>
					)}
					<Col span={24}>
						<p>
							<b>Trích yếu: </b> {record?.ten_vu_viec}
						</p>
					</Col>
				</Row>
			</div>

			<Tabs type="card" onChange={onChangeTab} defaultActiveKey={currentTab}>
				<Tabs.TabPane
					tab={
						<span>
							<FormOutlined />
							Thông tin chi tiết
						</span>
					}
					key="thong-tin"
				/>
				<Tabs.TabPane
					tab={
						<span>
							<TeamOutlined />
							{record?.loai_vu_viec === 'AĐ' ? 'Người trong vụ việc' : 'Người trong vụ án'}
						</span>
					}
					key="nguoi"
				/>
				<Tabs.TabPane
					tab={
						<span>
							<FileWordOutlined />
							Trích xuất biểu mẫu
						</span>
					}
					key="bieu-mau"
				/>
				<Tabs.TabPane
					tab={
						<span>
							<OrderedListOutlined />
							Công việc
						</span>
					}
					key="cong-viec"
				/>
				<Tabs.TabPane
					tab={
						<span>
							<PaperClipOutlined />
							Tài liệu báo cáo
						</span>
					}
					key="tai-lieu"
				/>
				<Tabs.TabPane
					tab={
						<span>
							<MailOutlined />
							Văn bản tố tụng
						</span>
					}
					key="cong-van"
				/>
			</Tabs>

			<div style={{ padding: '0 12px' }}>
				<Spin spinning={loading}>
					{currentTab === 'thong-tin' && (
						<Form form={form} onFinish={onFinish} layout="vertical">
							<FormChiTiet
								form={form}
								loading={loading}
								authUser={authUser}
								nguoi_tao={record?.nguoi_tao}
							/>
							<div className="tools-button" style={{ textAlign: 'center' }}>
								<Button onClick={() => window.history.back()}>
									<ArrowLeftOutlined /> Quay lại
								</Button>
								{(authUser.chi_huy ||
									[record?.nguoi_tao, record?.id_dtv_chinh, record?.id_can_bo_chinh].includes(
										authUser.id
									)) && (
									<Button htmlType="submit" type="primary" loading={formSubmitting}>
										<SaveOutlined />
										Lưu lại
									</Button>
								)}
							</div>
						</Form>
					)}
					{currentTab === 'nguoi' && <VuViecNguoi vuViec={record} />}
					{currentTab === 'bieu-mau' && <VuViecBieuMau vuViec={record} />}
					{currentTab === 'cong-viec' && <VuViecCongViec vuViec={record} />}
					{currentTab === 'tai-lieu' && <VuViecTaiLieu vuViec={id} />}
					{currentTab === 'cong-van' && <VuViecCongVan vuViec={record} />}
				</Spin>
			</div>
		</div>
	);
};

export default React.memo(VuViecChiTiet);
