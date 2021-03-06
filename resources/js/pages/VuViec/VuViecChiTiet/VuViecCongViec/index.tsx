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
import groupBy from 'lodash/groupBy';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { parseValues, unionDataBy, useMergeState } from '../../../../utils';
import axios from '../../../../utils/axios';
import {
	MA_CHUC_VU,
	MA_TRANG_THAI_CONG_VIEC,
	TEN_MUC_DO_UU_TIEN,
	TEN_TRANG_THAI_CONG_VIEC,
} from '../../../../utils/constant';
import { getApi } from '../../../../utils/services';
import FormVuViecCongViec from './FormItem';
import FormStatus from './FormStatus';

const List = (props: { vuViec: any }) => {
	const authUser = useSelector((state: RootState) => state.authUserReducer);
	const [form] = Form.useForm();
	const [formStatus] = Form.useForm();
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
	const [stateYKien, setStateYKien] = useMergeState({
		status: null,
		modalVisible: false,
		record: null,
	});
	const { data, loading, record, modalVisible, formSubmitting, trangThai, uuTien } = state;
	const { vuViec } = props;

	const fetchData = (trangThai = '', uuTien = '') => {
		getApi(`cong-viec?vu_viec=${vuViec}&trang_thai=${trangThai}&uu_tien=${uuTien}`)
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
			title: '?????ng ch?? c?? ch???c ch???n x??a th??ng tin C??ng vi???c n??y?',
			icon: <ExclamationCircleOutlined />,
			content: 'L??u ??: Thao t??c kh??ng th??? ho??n l???i',
			okText: 'X??a',
			okType: 'danger',
			cancelText: 'H???y',
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
					.post(`/api/cong-viec`, parseValues({ ...values, id_vu_viec: vuViec }))
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

	const onCancel = () => setState({ modalVisible: false });

	const onInsertAuto = () => {
		setState({ loading: true, formSubmitting: true });
		axios
			.post(`/api/cong-viec/khoi-tao`, { id_vu_viec: vuViec })
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

	const onFilter = (values: any) => {
		if (trangThai !== values.trangThai || uuTien !== values.uuTien) {
			setState({ loading: true, trangThai: values.trangThai, uuTien: values.uuTien });
			fetchData(values.trangThai, values.uuTien);
		}
	};

	const onSubmitStatus = (values: any) => {
		delete values.ten_cong_viec;
		axios.post(`/api/cong-viec/${values?.id ?? stateYKien.record.id}/trang-thai`, values).then((response) => {
			if (response.data.success) {
				message.success(response.data.message);
				setStateYKien({ record: null, status: null, modalVisible: false });

				const mergedData = unionDataBy(data, response.data.data, 'id'); // New data is first line
				setState({
					record: null,
					data: mergedData,
					formSubmitting: false,
					modalVisible: false,
				});
			}
		});
	};

	const hanleChangeStatus = (congViec: any, status: any) => {
		if (status.id === MA_TRANG_THAI_CONG_VIEC.DA_TIEP_NHAN || status.id === MA_TRANG_THAI_CONG_VIEC.DANG_THUC_HIEN)
			onSubmitStatus({ id: congViec.id, trang_thai: status.id }); // Set trang thai luon
		else {
			formStatus.setFieldsValue({ ...congViec, trang_thai: status.id });
			setStateYKien({ record: congViec, status, modalVisible: true }); // Show Modal
		}
	};

	const genHeader = (congViec: any, index: number) => (
		<>
			<span className="title-cong-viec">
				{index + 1 + '. ' + congViec.ten_cong_viec}
				{TEN_MUC_DO_UU_TIEN.filter((item) => item.id === congViec.muc_do_uu_tien).map((item) => (
					<Tag color={item.color} key={item.id} title="M???c ????? ??u ti??n">
						{item.label}
					</Tag>
				))}
			</span>
			<div className="sub-cong-viec">
				{TEN_TRANG_THAI_CONG_VIEC.filter((item) => item.id === congViec.trang_thai).map((item) => (
					<Tag color={item.color} key={item.id} title="Tr???ng th??i c??ng vi???c">
						{item.label}
					</Tag>
				))}
				{congViec.trang_thai === MA_TRANG_THAI_CONG_VIEC.MOI_TAO && 'Ng??y: ' + congViec.created_at}
				{congViec.trang_thai === MA_TRANG_THAI_CONG_VIEC.MOI_GIAO && 'Ng??y: ' + congViec.ngay_giao}
				{congViec.trang_thai === MA_TRANG_THAI_CONG_VIEC.DANG_THUC_HIEN && 'Ng??y: ' + congViec.ngay_bat_dau}
				{congViec.trang_thai === MA_TRANG_THAI_CONG_VIEC.DA_THUC_HIEN && 'Ng??y: ' + congViec.ngay_ket_thuc}
				{congViec.trang_thai === MA_TRANG_THAI_CONG_VIEC.XAC_NHAN && 'Ng??y: ' + congViec.ngay_xac_nhan}
				{congViec.trang_thai === MA_TRANG_THAI_CONG_VIEC.HOAN_THANH && 'Ng??y: ' + congViec.ngay_hoan_thanh}
				<Divider type="vertical" />
				Ng??y h???t h???n: {congViec.ngay_het_han}
			</div>
		</>
	);

	const genMenus = (congViec: any) => {
		let statusCongViec: any[] = [];
		// Can bo thu ly
		if (authUser.id === congViec.id_can_bo) {
			if (
				![
					MA_TRANG_THAI_CONG_VIEC.XAC_NHAN,
					MA_TRANG_THAI_CONG_VIEC.HUY,
					MA_TRANG_THAI_CONG_VIEC.HOAN_THANH,
				].includes(congViec.trang_thai)
			)
				statusCongViec = TEN_TRANG_THAI_CONG_VIEC.filter((item) =>
					[
						MA_TRANG_THAI_CONG_VIEC.DA_TIEP_NHAN,
						MA_TRANG_THAI_CONG_VIEC.DANG_THUC_HIEN,
						MA_TRANG_THAI_CONG_VIEC.DA_THUC_HIEN,
					].includes(item.id)
				);
		}
		if (authUser.chuc_vu >= MA_CHUC_VU.DOI_PHO) {
			// Neu chua hoan thanh thi co the huy
			if (congViec.trang_thai !== MA_TRANG_THAI_CONG_VIEC.HOAN_THANH)
				statusCongViec.push(
					TEN_TRANG_THAI_CONG_VIEC.filter((item) => item.id === MA_TRANG_THAI_CONG_VIEC.HUY)[0]
				);
			// Neu da thuc hien co the xac nhan hoac chua dat
			if (congViec.trang_thai === MA_TRANG_THAI_CONG_VIEC.DA_THUC_HIEN)
				statusCongViec = statusCongViec.concat(
					TEN_TRANG_THAI_CONG_VIEC.filter((item) =>
						[MA_TRANG_THAI_CONG_VIEC.XAC_NHAN, MA_TRANG_THAI_CONG_VIEC.CHUA_DAT].includes(item.id)
					)
				);
		}
		if (authUser.chuc_vu >= MA_CHUC_VU.GIUP_VIEC_PTT) {
			// Neu da thuc hien co the xac nhan hoac chua dat
			if (congViec.trang_thai === MA_TRANG_THAI_CONG_VIEC.XAC_NHAN)
				statusCongViec = statusCongViec.concat(
					TEN_TRANG_THAI_CONG_VIEC.filter((item) =>
						[MA_TRANG_THAI_CONG_VIEC.HOAN_THANH, MA_TRANG_THAI_CONG_VIEC.CHUA_DAT].includes(item.id)
					)
				);
			if (congViec.trang_thai === MA_TRANG_THAI_CONG_VIEC.DA_THUC_HIEN)
				statusCongViec.push(
					TEN_TRANG_THAI_CONG_VIEC.filter((item) => item.id === MA_TRANG_THAI_CONG_VIEC.HOAN_THANH)[0]
				);
		}
		return (
			<Menu
				items={statusCongViec.map((item) => ({
					key: item.id,
					label: <Tag color={item.color}>{item.label}</Tag>,
					onClick: () => hanleChangeStatus(congViec, item),
				}))}
			/>
		);
	};

	const genExtras = (congViec: any) => (
		<>
			<div className="extra-can-bo">
				{congViec.ten_can_bo_thu_ly !== null ? (
					<>
						{congViec.ngay_giao} <UserOutlined /> {congViec.ten_can_bo_thu_ly}
					</>
				) : (
					<i>Ch??a c?? c??n b??? th??? l??</i>
				)}
			</div>

			{congViec.trang_thai !== MA_TRANG_THAI_CONG_VIEC.HOAN_THANH &&
				congViec.trang_thai !== MA_TRANG_THAI_CONG_VIEC.HUY &&
				(authUser.chi_huy || authUser.id === congViec.id_can_bo || authUser.id === congViec.nguoi_tao) && (
					<Dropdown overlay={() => genMenus(congViec)}>
						<Button type="link" size="small">
							<CheckSquareOutlined /> C???p nh???t tr???ng th??i c??ng vi???c
						</Button>
					</Dropdown>
				)}

			{(authUser.chi_huy || authUser.id === congViec.nguoi_tao) && (
				<>
					<Divider type="vertical" />
					<Button type="link" size="small" title="Ch???nh s???a" onClick={() => handleEdit(congViec)}>
						<EditOutlined />
					</Button>
					<Button type="link" danger size="small" title="X??a" onClick={() => handleDelete(congViec)}>
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
								label="Ng??y t???o"
								labelCol={{ span: 4, xl: 6 }}
								wrapperCol={{ span: 20, xl: 18 }}
							>
								<MyRangePicker {...props} />
							</Form.Item>
						</Col> */}
						<Col span={12} md={8}>
							<Form.Item name="trangThai" label="Tr???ng th??i">
								<Select style={{ width: '100%' }}>
									<Select.Option value="">T???t c???</Select.Option>
									{TEN_TRANG_THAI_CONG_VIEC.map((value, index) => (
										<Select.Option value={value.id} key={index}>
											{value.label}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={12} md={8}>
							<Form.Item name="uuTien" label="M???c ????? ??u ti??n">
								<Select style={{ width: '100%' }}>
									<Select.Option value="">T???t c???</Select.Option>
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
								L???c
							</Button>
						</Col>
					</Row>
				</Form>
			</div>

			<div className="tools-button">
				<Button type="primary" onClick={handleInsert}>
					<PlusCircleFilled /> C??ng vi???c m???i
				</Button>
				{data.length === 0 && trangThai === '' && uuTien === '' && (
					<Popconfirm
						title="T??? ?????ng th??m c??c c??ng vi???c ???? kh???i t???o s???n?"
						onConfirm={onInsertAuto}
						okText="Th??m"
						cancelText="H???y"
					>
						<Button loading={formSubmitting}>Th??m c??c c??ng vi???c kh???i t???o</Button>
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
											<b>Ng??y t???o:</b> {cv.created_at} b???i {cv.ten_nguoi_tao}
										</p>
										<b>N???i dung c??? th???:</b>
										<br />
										<p
											dangerouslySetInnerHTML={{
												__html: (cv.noi_dung ?? '<i>Kh??ng c?? n???i dung</i>').replace(
													/\n/g,
													'<br />'
												),
											}}
										/>
										<b>K???t qu???:</b> <br />
										<p
											dangerouslySetInnerHTML={{
												__html: (cv.ket_qua ?? '<i>Kh??ng c?? k???t qu???</i>').replace(
													/\n/g,
													'<br />'
												),
											}}
										/>
										<b>?? ki???n ph?? duy???t:</b> <br />
										<p
											dangerouslySetInnerHTML={{
												__html: (cv.phe_duyet ?? '<i>Kh??ng c?? ph?? duy???t</i>').replace(
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

			{/* Modal insert / edit */}
			<Modal
				visible={modalVisible}
				title={record !== undefined ? 'Ch???nh s???a' : 'Th??m m???i'}
				onCancel={onCancel}
				footer={[
					<Button key="back" onClick={onCancel}>
						H???y
					</Button>,
					<Button key="submit" type="primary" loading={formSubmitting} onClick={onSubmit}>
						?????ng ??
					</Button>,
				]}
			>
				<Form layout="vertical" form={form}>
					<FormVuViecCongViec authUser={authUser} />
				</Form>
			</Modal>
			{/* Modal update status */}
			<Modal
				visible={stateYKien.modalVisible}
				title="C???p nh???t tr???ng th??i c??ng vi???c"
				onCancel={() => setStateYKien({ record: null, status: null, modalVisible: false })}
				footer={[
					<Button
						key="back"
						onClick={() => setStateYKien({ record: null, status: null, modalVisible: false })}
					>
						H???y
					</Button>,
					<Button
						key="submit"
						type="primary"
						onClick={() => formStatus.validateFields().then((values) => onSubmitStatus(values))}
					>
						?????ng ??
					</Button>,
				]}
			>
				<Form layout="vertical" form={formStatus}>
					<FormStatus status={stateYKien.status} />
				</Form>
			</Modal>
		</>
	);
};

export default React.memo(List);
