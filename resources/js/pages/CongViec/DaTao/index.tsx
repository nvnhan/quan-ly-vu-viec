import Tag from 'antd/lib/tag';
import Typography from 'antd/lib/typography';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ListForm from '../../../components/ListForm';
import { ColumnProps } from '../../../components/ListForm/DataTable';
import { RootState } from '../../../store';
import { parseValues } from '../../../utils';
import { TEN_MUC_DO_UU_TIEN, TEN_TRANG_THAI_CONG_VIEC } from '../../../utils/constant';

const List = () => {
	const navigate = useNavigate();
	const authUser = useSelector((state: RootState) => state.authUserReducer);

	const onCell = (row: any) => ({
		onClick: () => navigate(`/vu-viec/chi-tiet/${row.id_vu_viec}#cong-viec`),
		style: { cursor: 'pointer' },
	});

	const columns: ColumnProps[] = [
		{
			title: 'Vụ việc',
			dataIndex: 'ten_vu_viec',
			width: 180,
			render: (text: string) => <Typography.Paragraph ellipsis={{ rows: 3 }}>{text}</Typography.Paragraph>,
			// optFind: true,
			onCell,
		},
		{
			title: 'Nhóm công việc',
			dataIndex: 'ten_nhom_cong_viec',
			width: 120,
			onCell,
		},
		{
			title: 'Tên công việc',
			dataIndex: 'ten_cong_viec',
			optFind: true,
			width: 180,
			onCell,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trang_thai',
			render: (text: number) =>
				TEN_TRANG_THAI_CONG_VIEC.filter((item) => item.id === text).map((item) => (
					<Tag color={item.color} key={item.id} title={item.label}>
						{item.label}
					</Tag>
				)),
			align: 'center',
			optFilter: true,
			fixedFilter: TEN_TRANG_THAI_CONG_VIEC.map((item) => ({
				text: item.label,
				value: item.id,
			})),
			width: 100,
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
			title: 'Mức độ ưu tiên',
			dataIndex: 'muc_do_uu_tien',
			render: (text: number) =>
				TEN_MUC_DO_UU_TIEN.filter((item) => item.id === text).map((item) => (
					<Tag color={item.color} key={item.id} title={item.label}>
						{item.label}
					</Tag>
				)),
			align: 'center',
			optFilter: true,
			fixedFilter: TEN_MUC_DO_UU_TIEN.map((item) => ({
				text: item.label,
				value: item.id,
			})),
			width: 80,
		},
		{
			title: 'Ngày hết hạn',
			dataIndex: 'ngay_het_han',
			align: 'center',
			width: 80,
		},
		{
			title: 'Cán bộ thụ lý',
			dataIndex: 'ten_can_bo_thu_ly',
			width: 100,
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'created_at',
			align: 'center',
			width: 80,
		},
	];

	return (
		<ListForm
			url="cong-viec"
			columns={columns}
			ajax
			tableSize={{ x: 1200 }}
			filterBox
			filter={parseValues({
				thoiGian: [moment().clone().weekday(0).startOf('day'), moment().clone().weekday(6).endOf('day')],
				nguoi_tao: authUser.id,
			})}
			// otherFilter={getFilters()}
			filterInitialValue={{
				thoiGian: [moment().clone().weekday(0).startOf('day'), moment().clone().weekday(6).endOf('day')],
			}}
			selectable={false}
			insertable={false}
			editable={false}
			deleteable={false}
			addStt
		/>
	);
};

export default React.memo(List);
