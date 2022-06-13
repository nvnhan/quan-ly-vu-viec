import React from 'react';
import ListForm from '../../../components/ListForm';
import { ColumnProps } from '../../../components/ListForm/DataTable';

const List = () => {
	const columns: ColumnProps[] = [
		{
			title: 'Điều khoản',
			dataIndex: 'ma_toi_danh',
			width: 100,
			render: (text: any) => 'Điều ' + text,
			align: 'center',
		},
		{
			title: 'Tội danh',
			dataIndex: 'toi_danh',
			width: 200,
			optFind: true,
		},
	];

	return (
		<ListForm
			url="toi-danh"
			columns={columns}
			selectable={false}
			insertable={false}
			deleteable={false}
			editable={false}
			tableSize={{ x: 500 }}
		/>
	);
};

export default React.memo(List);
