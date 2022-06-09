import { FileExcelOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button/index';
import Tag from 'antd/lib/tag/index';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ListForm, { ListFormRef } from '../../../components/ListForm';
import { ColumnProps } from '../../../components/ListForm/DataTable';
import { ToolsButtonProps } from '../../../components/ListForm/ToolsButton';
import { AppState } from '../../../reducers';
import { User, vndFormater } from '../../../utils';
import { downloadApi } from '../../../utils/downloadFile';
import FormItem from './FormItem';
import getFilters from './otherFilters';

const List = () => {
	const navigate = useNavigate();
	const authUser = useSelector<AppState>((state) => state.authUser) as User;
	const childRef = useRef<ListFormRef>(null);
	const [otherButtons, setOtherButtons] = useState<ToolsButtonProps[]>([]);

	const allowInsert = () => authUser.username != '' && authUser.them_moi;

	const columns: ColumnProps[] = [
		{
			title: 'TT',
			dataIndex: 'id',
			width: 30,
			render: (text, record, index) => index !== undefined && <b>{index + 1}</b>,
			align: 'center',
		},
		{
			title: 'Tên khách',
			dataIndex: 'ho_ten',
			width: 150,
			render: (text, record, index) =>
				record['tinh_trang'] ? text : <span style={{ color: '#d4380d' }}>{text}</span>,
		},
		{
			title: 'Tình trạng',
			dataIndex: 'tinh_trang',
			width: 70,
			render: (tt: boolean, record: object) => (
				<span onClick={() => onChangeStatus(!tt, record)} style={{ cursor: 'pointer' }}>
					{tt ? <Tag color="green">còn</Tag> : <Tag color="volcano">hết</Tag>}
				</span>
			),
			align: 'center',
			optFilter: true,
			fixedFilter: [
				{
					text: 'Còn',
					value: '1',
				},
				{
					text: 'Hết',
					value: '-1',
				},
			],
		},
		{
			title: 'Giá gốc',
			dataIndex: 'gia_tien',
			render: (number) => typeof number === 'number' && vndFormater.format(number),
			width: 100,
			align: 'right',
		},
		{
			title: 'Giá bán',
			dataIndex: 'gia_ban',
			render: (number) => typeof number === 'number' && vndFormater.format(number),
			width: 100,
			align: 'right',
		},
		{
			title: 'Hãng',
			dataIndex: 'hang_bay',
			width: 60,
			align: 'center',
		},
		{
			title: 'F1',
			dataIndex: 'f1',
			width: 120,
		},
		{
			title: 'SĐT',
			dataIndex: 'sdt',
			width: 100,
		},
		{
			title: 'Ghi chú',
			dataIndex: 'ghi_chu',
			ellipsis: true,
			width: 150,
		},
		{
			title: 'Người tạo',
			dataIndex: 'username',
			width: 80,
			ellipsis: true,
			roles: ['admin'],
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'created_at',
			width: 80,
			ellipsis: true,
			roles: ['admin'],
		},
	];

	const onChangeStatus = (check: boolean, record: any) => {
		// console.log(check, record);
		axios
			.put(`/api/dinh-danh/sua-tinh-trang/` + record.id, { check })
			.then((response) => {
				if (childRef.current) childRef.current.triggerUpdate(response);
			})
			.catch((error) => console.log(error));
	};

	const hanldeChangeData = (data: any[], query?: object) => {
		const buttons: ToolsButtonProps[] = [];
		if (allowInsert())
			buttons.push({
				key: 'them-tu-file',
				onClick: () => navigate('/them-file'),
				title: 'Thêm từ file',
				icon: <FileExcelOutlined />,
				selectRequired: false,
			});
		if (query && data.length > 0)
			buttons.push({
				key: 'xuat-excel',
				onClick: () => downloadApi('/api/xuat-dinh-danh', query, 'dinh-danh.xlsx'),
				title: 'Xuất DS ra Excel',
				icon: <FileExcelOutlined />,
				selectRequired: false,
			});
		setOtherButtons(buttons);
	};

	return (
		<ListForm
			ref={childRef}
			url="dinh-danh"
			columns={columns}
			ajax
			selectable={authUser.admin}
			insertable={allowInsert()}
			deleteable={authUser.username != ''}
			editable={authUser.username != ''}
			filterBox
			onChangeData={hanldeChangeData}
			otherFilter={getFilters(authUser.username)}
			filterInitialValue={{ u: '' }}
			tuNgayDenNgay={false}
			otherButtons={otherButtons}
			checkUserDoAction
			tableSize={{ x: 900 }}
			modalWidth={800}
			formTemplate={<FormItem />}
		/>
	);
};

export default React.memo(List);
