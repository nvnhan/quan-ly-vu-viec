import CheckSquareOutlined from '@ant-design/icons/CheckSquareOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import PlusCircleFilled from '@ant-design/icons/PlusCircleFilled';
import UserOutlined from '@ant-design/icons/UserOutlined';
import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Collapse from 'antd/lib/collapse';
import Divider from 'antd/lib/divider';
import Dropdown from 'antd/lib/dropdown';
import Form from 'antd/lib/form';
import Menu from 'antd/lib/menu';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Popconfirm from 'antd/lib/popconfirm';
import Row from 'antd/lib/row';
import Select from 'antd/lib/select';
import Spin from 'antd/lib/spin';
import Tag from 'antd/lib/tag';
import axios from 'axios';
import { groupBy } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { parseValues, unionDataBy, useMergeState } from '../../../../utils';
import { TEN_MUC_DO_UU_TIEN, TEN_TRANG_THAI_CONG_VIEC } from '../../../../utils/constant';
import { getApi } from '../../../../utils/services';
import FormVuViecCongViec from './FormVuViecCongViec';

const List = (props: { vuViec: any }) => {
	const authUser = useSelector((state: RootState) => state.authUserReducer);
	const [form] = Form.useForm();
	const [formFilter] = Form.useForm();

	const [state, setState] = useMergeState({
		data: [],
		loading: true,
		record: null,
		trangThai: '',
		uuTien: '',
		modalVisible: false,
		formSubmitting: false,
	});
	const { data, loading, record, modalVisible, formSubmitting, trangThai, uuTien } = state;
	const { vuViec } = props;

	const fetchData = (trangThai = '', uuTien = '') => {
		getApi(`cong-viec?vu_viec=${vuViec.id}&trang_thai=${trangThai}&uu_tien=${uuTien}`)
			.then((response) => {
				if (response.data.success) {
					setState({ data: response.data.data, loading: false });
				}
			})
			.catch((error) => console.log(error));
	};

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

	const onFilter = (values: any) => {
		if (trangThai !== values.trangThai || uuTien !== values.uuTien) {
			setState({ loading: true, trangThai: values.trangThai, uuTien: values.uuTien });
			fetchData(values.trangThai, values.uuTien);
		}
	};

	const hanleChangeStatus = (congViec: any, status: any) => {};

	const genHeader = (congViec: any, index: number) => (
		<>
			<span className="title-cong-viec">
				{index + 1 + '. ' + congViec.ten_cong_viec}
				{TEN_MUC_DO_UU_TIEN.filter((item) => item.id === congViec.muc_do_uu_tien).map((item) => (
					<Tag color={item.color} key={item.id} title="Mức độ ưu tiên">
						{item.label}
					</Tag>
				))}
			</span>
			<div className="sub-cong-viec">
				{TEN_TRANG_THAI_CONG_VIEC.filter((item) => item.id === congViec.trang_thai).map((item) => (
					<Tag color={item.color} key={item.id} title="Trạng thái công việc">
						{item.label}
					</Tag>
				))}
				{congViec.trang_thai === 0 && 'Ngày: ' + congViec.created_at}
				{congViec.trang_thai === 1 && 'Ngày: ' + congViec.ngay_giao}
				{/* {congViec.trang_thai === 2 && 'Ngày: ' + congViec.ngay_giao} */}
				{congViec.trang_thai === 3 && 'Ngày: ' + congViec.ngay_bat_dau}
				{congViec.trang_thai === 4 && 'Ngày: ' + congViec.ngay_ket_thuc}
				{/* {congViec.trang_thai === 5 && 'Ngày: ' + congViec.created_at} */}
				{congViec.trang_thai === 6 && 'Ngày: ' + congViec.ngay_xac_nhan}
				{congViec.trang_thai === 7 && 'Ngày: ' + congViec.ngay_hoan_thanh}
				<Divider type="vertical" />
				Ngày hết hạn: {congViec.ngay_het_han}
			</div>
		</>
	);

	const genMenus = (congViec: any) => (
		<Menu
			items={TEN_TRANG_THAI_CONG_VIEC.map((item) => ({
				key: item.id,
				label: <Tag color={item.color}>{item.label}</Tag>,
				onClick: () => hanleChangeStatus(congViec, item),
			}))}
		/>
	);

	const genExtras = (congViec: any) => (
		<>
			<div className="extra-can-bo">
				{congViec.ten_can_bo_thu_ly !== null ? (
					<>
						{congViec.ngay_giao} <UserOutlined /> {congViec.ten_can_bo_thu_ly}
					</>
				) : (
					<i>Chưa có cán bộ thụ lý</i>
				)}
			</div>

			<Dropdown overlay={() => genMenus(congViec)}>
				<Button type="link" size="small">
					<CheckSquareOutlined /> Cập nhật trạng thái công việc
				</Button>
			</Dropdown>

			{(authUser.admin || authUser.id === congViec.nguoi_tao) && (
				<>
					<Divider type="vertical" />
					<Button type="link" size="small" title="Chỉnh sửa" onClick={() => handleEdit(congViec)}>
						<EditOutlined />
					</Button>
					<Button type="link" danger size="small" title="Xóa" onClick={() => handleDelete(congViec)}>
						<DeleteOutlined />
					</Button>
				</>
			)}
		</>
	);

	useEffect(() => {
		fetchData();
		formFilter.setFieldsValue({ trangThai: '', uuTien: '' });
	}, []);

	const groups = Object.entries(groupBy(data, 'ten_nhom_cong_viec'));

	return (
		<>
			<div className="filter-box">
				<Form form={formFilter} onFinish={onFilter} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
					<Row gutter={[10, 5]}>
						{/* <Col span={24} md={16} lg={12} xl={10}>
							<Form.Item
								name="thoiGian"
								label="Ngày tạo"
								labelCol={{ span: 4, xl: 6 }}
								wrapperCol={{ span: 20, xl: 18 }}
							>
								<MyRangePicker {...props} />
							</Form.Item>
						</Col> */}
						<Col span={12} md={8}>
							<Form.Item name="trangThai" label="Trạng thái">
								<Select style={{ width: '100%' }}>
									<Select.Option value="">Tất cả</Select.Option>
									{TEN_TRANG_THAI_CONG_VIEC.map((value, index) => (
										<Select.Option value={value.id} key={index}>
											{value.label}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={12} md={8}>
							<Form.Item name="uuTien" label="Mức độ ưu tiên">
								<Select style={{ width: '100%' }}>
									<Select.Option value="">Tất cả</Select.Option>
									{TEN_MUC_DO_UU_TIEN.map((value, index) => (
										<Select.Option value={value.id} key={index}>
											{value.label}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={12} md={8} lg={6}>
							<Button htmlType="submit">
								<FilterOutlined />
								Lọc
							</Button>
						</Col>
					</Row>
				</Form>
			</div>

			<div className="tools-button">
				<Button type="primary" onClick={handleInsert}>
					<PlusCircleFilled /> Công việc mới
				</Button>
				{data.length === 0 && trangThai === '' && uuTien === '' && (
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

			<div className="cong-viec-container">
				<Spin spinning={loading}>
					{groups.map((group, index) => (
						<React.Fragment key={index}>
							<Divider orientation="left" orientationMargin={0}>
								{group[0]}
							</Divider>
							<Collapse expandIconPosition="end" bordered={false}>
								{group[1].map((cv, index) => (
									<Collapse.Panel key={cv.id} header={genHeader(cv, index)} extra={genExtras(cv)}>
										<p>
											<b>Ngày tạo:</b> {cv.created_at} bởi {cv.ten_nguoi_tao}
										</p>
										<b>Nội dung cụ thể:</b>
										<br />
										<p
											dangerouslySetInnerHTML={{
												__html: (cv.noi_dung ?? '<i>Không có nội dung</i>').replace(
													/\n/g,
													'<br />'
												),
											}}
										/>
										<b>Kết quả:</b> <br />
										<p
											dangerouslySetInnerHTML={{
												__html: (cv.ket_qua ?? '<i>Không có kết quả</i>').replace(
													/\n/g,
													'<br />'
												),
											}}
										/>
										<b>Ý kiến phê duyệt:</b> <br />
										<p
											dangerouslySetInnerHTML={{
												__html: (cv.phe_duyet ?? '<i>Không có phê duyệt</i>').replace(
													/\n/g,
													'<br />'
												),
											}}
										/>
									</Collapse.Panel>
								))}
							</Collapse>
						</React.Fragment>
					))}
				</Spin>
			</div>

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
