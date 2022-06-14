import Tag from 'antd/es/tag';
import React from 'react';
import ListForm from '../../../components/ListForm';
import { ColumnProps } from '../../../components/ListForm/DataTable';
import FormItem from './FormItem';

const List = () => {
	const columns: ColumnProps[] = [
		{
			title: 'TT',
			dataIndex: 'id',
			width: 30,
			render: (text, record, index) => index !== undefined && <b>{index + 1}</b>,
			align: 'center',
		},
		{
			title: 'Loại vụ việc',
			dataIndex: 'loai_vu_viec',
			width: 50,
			align: 'center',
			render: (tt: string, record: object) =>
				tt === 'AĐ' ? (
					<Tag color="green">AĐ</Tag>
				) : tt === 'AK' ? (
					<Tag color="volcano">AK</Tag>
				) : (
					<Tag color="gold">{tt}</Tag>
				),
			optFilter: true,
		},
		{
			title: 'Nhóm công việc',
			dataIndex: 'ten_nhom_cong_viec',
			width: 100,
			optFilter: true,
		},
		{
			title: 'Tên công việc',
			dataIndex: 'ten_cong_viec',
			width: 150,
			optFind: true,
		},
		{
			title: 'Thời hạn',
			dataIndex: 'thoi_han',
			width: 50,
		},
	];

	return (
		<ListForm
			url="cong-viec-khoi-tao"
			columns={columns}
			selectable={false}
			modalWidth={600}
			formTemplate={<FormItem />}
		/>
	);
};

export default React.memo(List);
