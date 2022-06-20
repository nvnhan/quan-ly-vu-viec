import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';
import FileWordTwoTone from '@ant-design/icons/FileWordTwoTone';
import FormOutlined from '@ant-design/icons/FormOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import OrderedListOutlined from '@ant-design/icons/OrderedListOutlined';
import PaperClipOutlined from '@ant-design/icons/PaperClipOutlined';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Dropdown from 'antd/lib/dropdown';
import Form from 'antd/lib/form/index';
import Menu from 'antd/lib/menu';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
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
import FormBaoCao from './components/FormBaoCao';
import { downloadApi } from '../../../utils/downloadFile';

const VuViecChiTiet = () => {
	const [form] = Form.useForm();
	const [formBaoCao] = Form.useForm();
	const [record, setRecord] = useState<{ [key: string]: any }>({});
	const [loading, setLoading] = useState(true);
	const [formSubmitting, setFormSubmitting] = useState(false);
	const [stateBaoCao, setStateBaoCao] = useState({
		modalVisible: false,
		typeBaoCao: {} as { type: string; label: string } | undefined,
	});
	const { modalVisible, typeBaoCao } = stateBaoCao;
	const [currentTab, setCurrentTab] = useState<
		'Thông tin chi tiết' | 'Người trong vụ việc' | 'Tài liệu báo cáo' | 'Công văn' | 'Công việc'
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
					message.success(response.data.message);
				} else message.error(response.data.message);
			})
			.catch((error) => console.log(error))
			.then(() => setFormSubmitting(false));
	};

	const onChange = (tab: any) => setCurrentTab(tab);

	const showBaoCao = (bc: any) => setStateBaoCao({ modalVisible: true, typeBaoCao: bc });

	const onCancel = () => setStateBaoCao({ modalVisible: false, typeBaoCao: undefined });

	/**
	 * Submit form download BIEU MAU
	 */
	const onSubmit = () => {
		formBaoCao.validateFields().then((values) => {
			downloadApi(
				'/api/bao-cao',
				{ vu_viec: id, type: typeBaoCao?.type, lanh_dao: values.lanh_dao },
				(typeBaoCao?.label ?? 'BaoCao') + '.docx'
			);
		});
	};

	const phanCongToGiac = [
		{
			label: 'Thông báo tiếp nhận tố giác',
			type: 'PhanCongToGiac.TBTiepNhanToGiac',
		},
		{
			label: 'Báo cáo đề xuất phân công tố giác',
			type: 'PhanCongToGiac.BCDXPhanCongToGiac',
		},
		{
			label: 'Phân công PTT giải quyết tố giác',
			type: 'PhanCongToGiac.PCPTTGiaiQuyetToGiac',
		},
		{
			label: 'Phân công ĐTV giải quyết tố giác',
			type: 'PhanCongToGiac.QDPhanCongDTVGiaiQuyetToGiac',
		},
		{
			label: 'Kế hoạch xác minh tố giác',
			type: 'PhanCongToGiac.KHXMToGiac',
		},
		{
			label: 'Quyết định lập hồ sơ tố giác',
			type: 'PhanCongToGiac.LapHoSoADToGiac',
		},
	];

	const menuPhanCongToGiac = (
		<Menu
			items={phanCongToGiac.map((pc) => ({
				label: pc.label,
				key: pc.type,
				onClick: () => showBaoCao(pc),
				icon: <FileWordTwoTone />,
			}))}
		/>
	);

	return (
		<div className="list-form">
			<div className="filter-box">
				<Button onClick={() => window.history.back()} type="link">
					<ArrowLeftOutlined /> Quay lại
				</Button>
				<b style={{ fontSize: '1.15rem' }}>Vụ: {record.ten_vu_viec}</b>
			</div>

			<div style={{ padding: '16px 12px' }}>
				<Row gutter={[12, 5]}>
					<Col span={24} sm={12}>
						<b>Thời điểm xảy ra:</b> {record.thoi_diem_xay_ra}, tại: {record.noi_xay_ra}
					</Col>
					<Col span={24} sm={12}>
						<b>Nội dung tóm tắt:</b> {record.noi_dung_tom_tat}
					</Col>

					<Col span={24}>
						<b>Trích xuất biểu mẫu:</b>
						<Dropdown overlay={menuPhanCongToGiac}>
							<Button style={{ margin: '2px 5px' }}>
								Phân công tố giác
								<DownOutlined />
							</Button>
						</Dropdown>
						<Dropdown overlay={menuPhanCongToGiac}>
							<Button style={{ margin: '2px 5px' }}>
								Không khởi tố tố giác
								<DownOutlined />
							</Button>
						</Dropdown>
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
							Người trong vụ việc
						</span>
					}
					key="Người trong vụ việc"
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
					{currentTab === 'Người trong vụ việc' && <ViewVuViecNguoi vuViec={record} />}
					{currentTab === 'Công việc' && <ViewVuViecCongViec vuViec={record} />}
					{currentTab === 'Tài liệu báo cáo' && <ViewVuViecTaiLieu />}
					{currentTab === 'Công văn' && <ViewVuViecCongVan />}
				</Spin>
			</div>

			<Modal
				visible={modalVisible}
				title="Trích xuất biểu mẫu"
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
				<Form layout="vertical" form={formBaoCao}>
					<FormBaoCao />
				</Form>
			</Modal>
		</div>
	);
};

export default React.memo(VuViecChiTiet);
