import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNhomCongViec } from '../../reducers/nhomCongViec';
import { RootState } from '../../store';

const TrangChu = () => {
	const nhom = useSelector((state: RootState) => state.nhomCongViec);
	const dispatch = useDispatch();
	nhom.status === 'idle' && dispatch(fetchNhomCongViec());
	// const columns: ColumnProps[] = [
	// 	{
	// 		title: 'Điều khoản',
	// 		dataIndex: 'ma_toi_danh',
	// 		width: 100,
	// 		render: (text: any) => 'Điều ' + text,
	// 		align: 'center',
	// 	},
	// 	{
	// 		title: 'Tội danh',
	// 		dataIndex: 'toi_danh',
	// 		width: 200,
	// 		optFind: true,
	// 	},
	// ];

	return (
		<h1>TRANG CHỦ</h1>
		// <ListForm
		// 	url="toi-danh"
		// 	columns={columns}
		// 	selectable={false}
		// 	insertable={false}
		// 	deleteable={false}
		// 	editable={false}
		// 	tableSize={{ x: 500 }}
		// />
	);
};

export default React.memo(TrangChu);
