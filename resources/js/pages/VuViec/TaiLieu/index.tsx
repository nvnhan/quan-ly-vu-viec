import Typography from 'antd/lib/typography';
import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListForm from '../../../components/ListForm';
import { ColumnProps } from '../../../components/ListForm/DataTable';
import { parseValues } from '../../../utils';
import { downloadApi } from '../../../utils/downloadFile';
import getFilters from '../ThongTinVuViec/otherFilters';

const List = () => {
	const navigate = useNavigate();
	const downloadFile = (id_tai_lieu: any, fileName: string) => {
		downloadApi(`/api/tai-lieu/${id_tai_lieu}/tai-file`, {}, fileName);
	};

	const onCell = (row: any) => ({
		onClick: () => navigate(`/vu-viec/chi-tiet/${row.id_vu_viec}#tai-lieu`),
		style: { cursor: 'pointer' },
	});

	const columns: ColumnProps[] = [
		{
			title: 'Vụ việc',
			dataIndex: 'ten_vu_viec',
			width: 180,
			// optFind: true,
			onCell,
		},
		{
			title: 'Tên tài liệu',
			dataIndex: 'ten_tai_lieu',
			optFind: true,
			width: 180,
			onCell,
		},
		{
			title: 'Nội dung',
			dataIndex: 'noi_dung',
			render: (text: string) => <Typography.Paragraph ellipsis={{ rows: 3 }}>{text}</Typography.Paragraph>,
			width: 250,
			// optFind: true,
			onCell,
		},
		{
			title: 'Tập tin',
			dataIndex: 'ten_file',
			render: (text: string, record: any) => <a onClick={() => downloadFile(record.id, text)}>{text}</a>,
			width: 120,
		},
		{
			title: 'Người đăng',
			dataIndex: 'ten_nguoi_tao',
			width: 100,
		},
		{
			title: 'Ngày đăng',
			dataIndex: 'created_at',
			width: 90,
		},
	];

	return (
		<ListForm
			url="tai-lieu"
			columns={columns}
			ajax
			tableSize={{ x: 1000 }}
			filterBox
			// filter={parseValues({
			// 	thoiGian: [moment().clone().weekday(0).startOf('day'), moment().clone().weekday(6).endOf('day')],
			// })}
			// otherFilter={getFilters()}
			// filterInitialValue={{
			// 	thoiGian: [moment().clone().weekday(0).startOf('day'), moment().clone().weekday(6).endOf('day')],
			// }}
			selectable={false}
			insertable={false}
			editable={false}
			deleteable={false}
			addStt
		/>
	);
};

export default React.memo(List);
