import EyeOutlined from '@ant-design/icons/EyeOutlined';
import Input from 'antd/lib/input/Input';
import Typography from 'antd/lib/typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListForm from '../../../components/ListForm';
import { ColumnProps, OtherActionProps } from '../../../components/ListForm/DataTable';
import { FilterProps } from '../../../components/ListForm/FilterBox';
import FormItem from './FormItem';

const List = () => {
	const navigate = useNavigate();

	const handleView = (record: any) => navigate('/nguoi-lien-quan/chi-tiet/' + record.id);

	const onCell = (record: any) => ({
		onClick: () => handleView(record), // click row
		style: { cursor: 'pointer' },
	});

	const otherActions: OtherActionProps[] = [
		{
			key: 'view',
			onClick: (record: any) => handleView(record),
			title: 'Xem chi tiết',
			icon: <EyeOutlined />,
		},
	];

	const otherFilters: FilterProps[] = [
		{
			label: 'Họ tên',
			name: 'ten',
			render: <Input placeholder="Tìm kiếm theo tên" />,
			alwaysShow: true,
		},
		{
			label: 'Số định danh',
			name: 'dd',
			render: <Input />,
			alwaysShow: true,
		},
		{
			label: 'Tên bố',
			name: 'bo',
			render: <Input />,
			alwaysShow: true,
		},
		{
			label: 'Tên mẹ',
			name: 'me',
			render: <Input />,
			alwaysShow: true,
		},
	];

	const columns: ColumnProps[] = [
		{
			title: 'TT',
			dataIndex: 'id',
			width: 40,
			render: (text, record, index) => index !== undefined && <b>{index + 1}</b>,
			align: 'center',
			onCell,
		},
		{
			title: 'Họ tên',
			dataIndex: 'ho_ten',
			width: 140,
			onCell,
		},
		{
			title: 'Giới tính',
			dataIndex: 'gioi_tinh',
			align: 'center',
			width: 60,
			onCell,
		},
		{
			title: 'Ngày sinh',
			dataIndex: 'ngay_sinh_day_du',
			width: 80,
			onCell,
		},
		{
			title: 'Số định danh',
			dataIndex: 'so_dinh_danh',
			width: 120,
			onCell,
		},
		{
			title: 'Họ tên bố',
			dataIndex: 'ho_ten_bo',
			width: 120,
			onCell,
		},
		{
			title: 'Họ tên mẹ',
			dataIndex: 'ho_ten_me',
			width: 120,
			onCell,
		},
		{
			title: 'Họ tên vợ/chồng',
			dataIndex: 'ho_ten_vo_chong',
			width: 120,
			onCell,
		},
		{
			title: 'Thường trú',
			dataIndex: 'ten_thuong_tru',
			width: 170,
			render: (text) => <Typography.Paragraph ellipsis={{ rows: 2 }}>{text}</Typography.Paragraph>,
			onCell,
		},
		{
			title: 'Nơi ở hiện nay',
			dataIndex: 'ten_noi_o_hien_nay',
			width: 170,
			render: (text) => <Typography.Paragraph ellipsis={{ rows: 2 }}>{text}</Typography.Paragraph>,
			onCell,
		},
	];

	return (
		<ListForm
			url="nguoi"
			ajax
			columns={columns}
			tableSize={{ x: 1300 }}
			// insertable={false}
			selectable={false}
			editable={false}
			deleteable={false}
			otherActions={otherActions}
			formInitialValues={{ quoc_tich: 'Việt Nam', dan_toc: 'Kinh', ton_giao: 'Không' }}
			filterBox
			otherFilter={otherFilters}
			tuNgayDenNgay={false}
			formTemplate={<FormItem />}
			modalWidth={1200}
		/>
	);
};

export default React.memo(List);
