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
			title: 'Tên nhóm công việc',
			dataIndex: 'nhom_cong_viec',
			width: 150,
		},
	];

	return (
		<ListForm url="nhom-cong-viec" columns={columns} insertable deleteable editable formTemplate={<FormItem />} />
	);
};

export default React.memo(List);
