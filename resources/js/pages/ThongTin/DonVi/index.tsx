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
			title: 'Tên đơn vị',
			dataIndex: 'ten_don_vi',
			optFind: true,
			width: 150,
		},
		{
			title: 'Loại đơn vị',
			dataIndex: 'loai_don_vi',
			optFilter: true,
			width: 80,
		},
		{
			title: 'Mã đơn vị',
			dataIndex: 'ma_don_vi',
			width: 50,
		},
		{
			title: 'Đơn vị trực thuộc',
			dataIndex: 'ten_don_vi_cha',
			optFind: true,
			width: 200,
		},
	];

	return (
		<ListForm
			url="don-vi"
			columns={columns}
			tableSize={{ x: 700 }}
			selectable={false}
			formTemplate={<FormItem />}
		/>
	);
};

export default React.memo(List);
