import Tag from 'antd/lib/tag/index';
import Typography from 'antd/lib/typography';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ListForm from '../../../components/ListForm';
import { ColumnProps } from '../../../components/ListForm/DataTable';
import { RootState } from '../../../store';
import { KET_QUA_DON, PHUONG_THUC_PHAM_TOI } from '../../../utils/constant';
import FormItem from './FormItem';
import getFilters from './otherFilters';

const List = () => {
	const navigate = useNavigate();
	const authUser = useSelector((state: RootState) => state.authUserReducer);

	const handleView = (record: any) => navigate('/vu-viec/chi-tiet/' + record.id);

	const onCell = (record: any) => ({
		onClick: () => handleView(record), // click row
		style: { cursor: 'pointer' },
	});

	const columns: ColumnProps[] = [
		{
			title: 'Tên vụ việc',
			dataIndex: 'ten_vu_viec',
			width: 200,
			render: (text: string) => <Typography.Paragraph ellipsis={{ rows: 4 }}>{text}</Typography.Paragraph>,
			onCell,
		},
		{
			title: '',
			dataIndex: 'loai_vu_viec',
			width: 50,
			render: (tt: string, record: object) =>
				tt === 'AĐ' ? (
					<Tag color="green">AĐ</Tag>
				) : tt === 'AK' ? (
					<Tag color="volcano">AK</Tag>
				) : (
					<Tag color="gold">{tt}</Tag>
				),
			align: 'center',
			optFilter: true,
			fixedFilter: [
				{ text: 'AĐ', value: 'AĐ' },
				{ text: 'AK', value: 'AK' },
			],
			onCell,
		},
		// {
		// 	title: 'Phân loại tin',
		// 	dataIndex: 'phan_loai_tin',
		// 	width: 100,
		// 	onCell,
		// 	optFilter: true,
		// 	fixedFilter: Object.values(PHAN_LOAI_TIN).map((pl) => ({ value: pl, text: pl })),
		// },
		{
			title: 'Ngày CQĐT tiếp nhận',
			dataIndex: 'ngay_cqdt',
			width: 70,
			align: 'center',
			onCell,
		},
		{
			title: 'Xảy ra',
			dataIndex: 'thoi_diem_xay_ra',
			render: (text: string, record: any) => (
				<>
					Thời gian: {text}
					<br />
					Tại: {record.noi_xay_ra}
					<br />
					Địa bàn: {record.khu_vuc_xay_ra}
				</>
			),
			width: 180,
			onCell,
		},
		{
			title: 'Phương thức phạm tội',
			dataIndex: 'phuong_thuc_pham_toi',
			width: 100,
			onCell,
			optFilter: true,
			fixedFilter: Object.values(PHUONG_THUC_PHAM_TOI).map((pl) => ({ value: pl, text: pl })),
		},
		// {
		// 	title: 'Ngày CAP tiếp nhận',
		// 	dataIndex: 'ngay_ca_phuong',
		// 	width: 70,
		// 	align: 'center',
		// 	onCell,
		// },
		{
			title: 'Kết quả xử lý tin',
			dataIndex: 'ket_qua_giai_quyet',
			width: 100,
			onCell,
			optFilter: true,
			fixedFilter: [
				{ value: 'null', text: '(Chưa có kết quả)' },
				...Object.values(KET_QUA_DON).map((pl) => ({ value: pl, text: pl })),
			],
		},
		// {
		// 	title: 'Ngày tạo',
		// 	dataIndex: 'created_at',
		// 	width: 70,
		// 	align: 'center',
		// 	onCell,
		// },
	];

	return (
		<ListForm
			url="vu-viec"
			columns={columns}
			ajax
			selectable={false}
			editable={false}
			deleteable={authUser.quan_tri}
			filterBox
			// filter={parseValues({
			// 	thoiGian: [moment().clone().weekday(0).startOf('day'), moment().clone().weekday(6).endOf('day')],
			// })}
			otherFilter={getFilters()}
			// filterInitialValue={{
			// 	thoiGian: [moment().clone().weekday(0).startOf('day'), moment().clone().weekday(6).endOf('day')],
			// }}
			tuNgayDenNgay
			checkUserDoAction
			tableSize={{ x: 1200 }}
			modalWidth={1200}
			formTemplate={<FormItem />}
			formInitialValues={{
				ngay_ca_phuong: moment().startOf('day'),
				ngay_cqdt: moment().startOf('day'),
				ngay_phan_cong: moment().startOf('day'),
				loai_vu_viec: 'AĐ',
			}}
			addStt
		/>
	);
};

export default React.memo(List);
