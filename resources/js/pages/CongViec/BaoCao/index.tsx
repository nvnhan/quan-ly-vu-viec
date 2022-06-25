import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListForm from '../../../components/ListForm';
import { ColumnProps } from '../../../components/ListForm/DataTable';

const List = () => {
	const navigate = useNavigate();

	const columns: ColumnProps[] = [
		{
			title: 'Cán bộ',
			dataIndex: 'ho_ten',
			width: 120,
			optFind: true,
		},
		{
			title: 'Cấp bậc',
			dataIndex: 'ten_cap_bac',
			width: 80,
		},
		{
			title: 'Chức vụ',
			dataIndex: 'ten_chuc_vu',
			width: 80,
		},
		{
			title: 'Đơn vị',
			dataIndex: 'ten_don_vi',
			optFilter: true,
			width: 180,
		},
		{
			title: 'Hoàn thành đúng hạn',
			dataIndex: 'cv_hoan_thanh_dung_han',
			width: 80,
			sorter: (a, b) => a.cv_hoan_thanh_dung_han - b.cv_hoan_thanh_dung_han,
			align: 'center',
		},
		{
			title: 'Hoàn thành quá hạn',
			dataIndex: 'cv_hoan_thanh_qua_han',
			width: 80,
			sorter: (a, b) => a.cv_hoan_thanh_qua_han - b.cv_hoan_thanh_qua_han,
			align: 'center',
		},
		{
			title: 'Chờ đánh giá',
			dataIndex: 'cv_cho_danh_gia',
			width: 80,
			sorter: (a, b) => a.cv_cho_danh_gia - b.cv_cho_danh_gia,
			align: 'center',
		},
		{
			title: 'Đang tiến hành',
			dataIndex: 'cv_thuc_hien',
			width: 80,
			sorter: (a, b) => a.cv_thuc_hien - b.cv_thuc_hien,
			align: 'center',
		},
		{
			title: 'Đã hủy',
			dataIndex: 'cv_huy',
			width: 80,
			sorter: (a, b) => a.cv_huy - b.cv_huy,
			align: 'center',
		},
		{
			title: 'Muộn (chung)',
			dataIndex: 'cv_muon',
			width: 80,
			sorter: (a, b) => a.cv_muon - b.cv_muon,
			align: 'center',
		},
	];

	return (
		<ListForm
			url="cong-viec/bao-cao"
			columns={columns}
			tableSize={{ x: 1100 }}
			selectable={false}
			insertable={false}
			editable={false}
			deleteable={false}
			addStt
		/>
	);
};

export default React.memo(List);
