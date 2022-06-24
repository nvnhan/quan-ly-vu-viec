import Typography from 'antd/lib/typography';
import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListForm from '../../../components/ListForm';
import { ColumnProps } from '../../../components/ListForm/DataTable';
import { parseValues } from '../../../utils';
import getFilters from '../ThongTinVuViec/otherFilters';

const List = (props: { vuViec: any }) => {
	const navigate = useNavigate();

	const onCell = (row: any) => ({
		onClick: () => navigate(`/vu-viec/chi-tiet/${row.id_vu_viec}#cong-van`),
		style: { cursor: 'pointer' },
	});

	const columns: ColumnProps[] = [
		{
			title: 'Vụ việc',
			dataIndex: 'ten_vu_viec',
			width: 180,
			onCell,
		},
		{
			title: 'Tiêu đề công văn',
			dataIndex: 'tieu_de',
			width: 180,
			onCell,
		},
		{
			title: 'Số hiệu',
			dataIndex: 'so_hieu',
			align: 'center',
			width: 80,
			onCell,
		},
		{
			title: 'Ngày ban hành',
			dataIndex: 'ngay_ban_hanh',
			align: 'center',
			width: 80,
			onCell,
		},
		{
			title: 'Hạn trả lời',
			dataIndex: 'han_tra_loi',
			align: 'center',
			width: 80,
			onCell,
		},
		{
			title: 'Nơi nhận',
			dataIndex: 'co_quan_nhan',
			width: 120,
			onCell,
		},
		{
			title: 'Số CV phản hồi',
			dataIndex: 'so_cong_van_phan_hoi',
			align: 'center',
			width: 80,
		},
		{
			title: 'Ngày phản hồi',
			dataIndex: 'ngay_phan_hoi',
			align: 'center',
			width: 80,
		},
		{
			title: 'Nội dung phản hồi',
			dataIndex: 'noi_dung_phan_hoi',
			render: (text: string) => <Typography.Paragraph ellipsis={{ rows: 3 }}>{text}</Typography.Paragraph>,
			width: 250,
		},
		{
			title: 'Cán bộ thụ lý',
			dataIndex: 'ten_can_bo_thu_ly',
			// optFilter: true,
			width: 100,
		},
	];

	return (
		<ListForm
			ajax
			url="cong-van"
			columns={columns}
			tableSize={{ x: 1400 }}
			selectable={false}
			editable={false}
			insertable={false}
			deleteable={false}
			filterBox
			filter={parseValues({
				thoiGian: [moment().clone().weekday(0).startOf('day'), moment().clone().weekday(6).endOf('day')],
			})}
			otherFilter={getFilters()}
			filterInitialValue={{
				thoiGian: [moment().clone().weekday(0).startOf('day'), moment().clone().weekday(6).endOf('day')],
			}}
			addStt
		/>
	);
};

export default React.memo(List);
