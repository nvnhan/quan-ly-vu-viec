import CloseOutlined from '@ant-design/icons/CloseOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import PlusCircleFilled from '@ant-design/icons/PlusCircleFilled';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import Form from 'antd/lib/form/index';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import Menu from 'antd/lib/menu/index';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Table from 'antd/lib/table';
import Typography from 'antd/lib/typography';
import axios from 'axios';
import { groupBy } from 'lodash';
import React, { useEffect } from 'react';
import { ColumnProps } from '../../../../components/ListForm/DataTable';
import { parseValues, unionDataBy, useMergeState } from '../../../../utils';
import { TU_CACH_TO_TUNG } from '../../../../utils/constant';
import { getApi } from '../../../../utils/services';
import FormChiTietNguoi from '../../../ThongTin/Nguoi/FormItem';
import FormVuViecNguoi from './FormVuViecNguoi';
import ViewTimNguoi from './ViewTimNguoi';

const ViewVuViecNguoi = (props: { vuViec: any }) => {
	const [form] = Form.useForm();
	const [formState, setFormSate] = useMergeState({
		data: [],
		groupData: [],
		loading: true,
		view: 'table',
		record: null,
		recordNguoi: null,
		formSubmitting: false,
	});
	const { vuViec } = props;

	useEffect(() => {
		getApi('vu-viec-nguoi?vu_viec=' + vuViec.id).then((response) => {
			if (response.data.success) {
				// populate all field of Nguoi into VuViecNguoi
				const newData = response.data.data.map((item: any) => {
					item = { ...item.nguoi, ...item };
					delete item.nguoi;
					return item;
				});
				setFormSate({ data: newData, groupData: convertDataToGroups(newData), loading: false });
			}
		});
	}, []);

	const convertDataToGroups = (data: any[]) => {
		const groups = Object.entries(groupBy(data, 'tu_cach_to_tung'));
		let objs: any[] = [];
		groups.forEach((group, index) => {
			objs.push({
				id: -index,
				ho_ten:
					TU_CACH_TO_TUNG.find((tc) => tc.id == Number(group[0]))?.label + ': ' + group[1].length + ' người',
				children: group[1],
			});
		});
		return objs;
	};

	const columns: ColumnProps[] = [
		{
			title: 'TT',
			dataIndex: 'id',
			width: 40,
			render: (text, record, index) => index !== undefined && <b>{index + 1}</b>,
			align: 'center',
		},
		{
			title: 'Họ tên',
			dataIndex: 'ho_ten',
			render: (text, record) => (record.id <= 0 ? <b>{text}</b> : text),
			width: 140,
		},
		{
			title: 'Giới tính',
			dataIndex: 'gioi_tinh',
			align: 'center',
			width: 60,
		},
		{
			title: 'Ngày sinh',
			dataIndex: 'ngay_sinh_day_du',
			width: 80,
		},
		{
			title: 'Số định danh',
			dataIndex: 'so_dinh_danh',
			width: 120,
		},
		// {
		// 	title: 'Họ tên bố',
		// 	dataIndex: 'ho_ten_bo',
		// 	width: 120,
		// },
		// {
		// 	title: 'Họ tên mẹ',
		// 	dataIndex: 'ho_ten_me',
		// 	width: 120,
		// },
		// {
		// 	title: 'Họ tên vợ/chồng',
		// 	dataIndex: 'ho_ten_vo_chong',
		// 	width: 120,
		// },
		{
			title: 'Thường trú',
			dataIndex: 'ten_thuong_tru',
			width: 170,
			render: (text) => <Typography.Paragraph ellipsis={{ rows: 2 }}>{text}</Typography.Paragraph>,
		},
		{
			title: 'Nơi ở hiện nay',
			dataIndex: 'ten_noi_o_hien_nay',
			width: 170,
			render: (text) => <Typography.Paragraph ellipsis={{ rows: 2 }}>{text}</Typography.Paragraph>,
		},
		{
			title: '',
			fixed: 'right',
			align: 'center',
			width: 60,
			dataIndex: 'actions',
			render: (text, record) =>
				record.id > 0 && (
					<Dropdown overlay={layAction(record)}>
						<Button>
							<MenuOutlined />
						</Button>
					</Dropdown>
				),
		},
	];

	const layAction = (record: any) => {
		let items: ItemType[] = [];
		items.push({
			key: 'edit',
			onClick: () => handleEdit(record),
			className: 'color-link',
			label: (
				<>
					<EditOutlined /> Chỉnh sửa
				</>
			),
		});
		items.push({
			key: 'delete',
			onClick: () => handleDelete(record),
			className: 'color-danger',
			danger: true,
			label: (
				<>
					<DeleteOutlined /> Xóa
				</>
			),
		});
		return <Menu items={items} />;
	};

	const handleEdit = (record: any) => {
		setFormSate({ view: 'edit', record });
		form.setFieldsValue(record);
	};

	const handleDelete = (record: any) => {
		Modal.confirm({
			title: 'Đồng chí có chắc chắn xóa thông tin Người - Vụ việc này?',
			icon: <ExclamationCircleOutlined />,
			content: 'Lưu ý: Thông tin về người liên quan sẽ vẫn được lưu trữ để phục vụ tra cứu',
			okText: 'Xóa',
			okType: 'danger',
			cancelText: 'Hủy',
			onOk: () => {
				axios
					.delete(`/api/vu-viec-nguoi/${record.id}`)
					.then((response) => {
						if (response.data.success) {
							const newData = formState.data.filter((item: any) => item.id !== record.id);
							setFormSate({
								data: newData,
								groupData: convertDataToGroups(newData),
							});
							message.info(response.data.message);
						}
					})
					.catch((error) => console.log(error));
			},
		});
	};

	const handleInsert = () => {
		setFormSate({ view: 'insert', record: null });
		form.setFieldsValue({ quoc_tich: 'Việt Nam', dan_toc: 'Kinh', ton_giao: 'Không' });
	};
	const handleCanel = () => setFormSate({ view: 'table', record: null });

	/**
	 * On submit form Insert or Update
	 * @param values
	 */
	const onFinish = (values: any) => {
		setFormSate({ formSubmitting: true });
		if (formState.view === 'insert') {
			axios
				.post(
					`/api/vu-viec-nguoi`,
					parseValues({ ...values, id_vu_viec: vuViec.id, id_nguoi: formState.recordNguoi?.id })
				)
				.then((response: any) => {
					const newData = { ...response.data.data.nguoi, ...response.data.data };
					delete newData.nguoi;
					const mergedData = unionDataBy(formState.data, newData, 'id'); // New data is first line

					setFormSate({
						view: 'table',
						record: null,
						data: mergedData,
						groupData: convertDataToGroups(mergedData),
						formSubmitting: false,
					});
					message.success(response.data.message);
				})
				.catch((error) => console.log(error));
		} else {
			axios
				.put(`/api/vu-viec-nguoi/${formState.record.id}`, parseValues(values))
				.then((response: any) => {
					const newData = { ...response.data.data.nguoi, ...response.data.data };
					delete newData.nguoi;
					const mergedData = unionDataBy(formState.data, newData, 'id'); // New data is first line

					setFormSate({
						view: 'table',
						record: null,
						data: mergedData,
						groupData: convertDataToGroups(mergedData),
						formSubmitting: false,
					});
					message.success(response.data.message);
				})
				.catch((error) => console.log(error));
		}
	};

	const onSetNguoi = (recordNguoi: any) => {
		setFormSate({
			recordNguoi,
		});
		form.setFieldsValue(recordNguoi);
	};

	return formState.view === 'table' ? (
		<>
			<div className="tools-button">
				<Button type="primary" onClick={handleInsert}>
					<PlusCircleFilled /> Thêm mới
				</Button>
			</div>
			<Table
				columns={columns}
				loading={formState.loading}
				dataSource={formState.groupData}
				rowKey={(row) => row.id}
				scroll={{ x: 1200 }}
			/>
		</>
	) : (
		<>
			<div style={{ padding: '10px' }}>
				<Button onClick={handleCanel}>
					<CloseOutlined />
					Hủy
				</Button>
				{formState.view === 'insert' && formState.recordNguoi === null && (
					<div style={{ marginTop: '10px' }}>
						<ViewTimNguoi onSetNguoi={onSetNguoi} id_vu_viec={vuViec.id} />
					</div>
				)}
			</div>
			<Form form={form} layout="vertical" onFinish={onFinish}>
				<FormChiTietNguoi />
				<FormVuViecNguoi />

				<div className="tools-button" style={{ textAlign: 'center' }}>
					<Button onClick={handleCanel}>
						<CloseOutlined /> Hủy
					</Button>
					<Button htmlType="submit" type="primary" loading={formState.formSubmitting}>
						<SaveOutlined />
						{formState.view === 'insert' ? 'Thêm mới' : 'Lưu lại'}
					</Button>
				</div>
			</Form>
		</>
	);
};

export default ViewVuViecNguoi;
