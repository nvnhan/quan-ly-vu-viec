import Tag from 'antd/lib/tag/index';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ListForm from '../../../components/ListForm';
import { ColumnProps } from '../../../components/ListForm/DataTable';
import { RootState } from '../../../store';
import { parseValues } from '../../../utils';
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
			title: 'TT',
			dataIndex: 'id',
			width: 30,
			render: (text, record, index) => index !== undefined && <b>{index + 1}</b>,
			align: 'center',
			onCell,
		},
		{
			title: 'Tên vụ việc',
			dataIndex: 'ten_vu_viec',
			width: 150,
			onCell,
		},
		{
			title: 'Loại vụ việc',
			dataIndex: 'loai_vu_viec',
			width: 60,
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
		{
			title: 'Phân loại tin',
			dataIndex: 'phan_loai_tin',
			width: 100,
			onCell,
			optFilter: true,
			fixedFilter: [
				{ value: 'Tin báo về tội phạm', text: 'Tin báo về tội phạm' },
				{ value: 'Tố giác về tội phạm', text: 'Tố giác về tội phạm' },
				{ value: 'Kiến nghị khởi tố', text: 'Kiến nghị khởi tố' },
				{ value: 'CQĐT trực tiếp phát hiện', text: 'CQĐT trực tiếp phát hiện' },
			],
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
			title: 'Ngày CAP tiếp nhận',
			dataIndex: 'ngay_ca_phuong',
			width: 70,
			align: 'center',
			onCell,
		},
		{
			title: 'Ngày CQĐT tiếp nhận',
			dataIndex: 'ngay_cqdt',
			width: 70,
			align: 'center',
			onCell,
		},
		{
			title: 'Kết quả xử lý',
			dataIndex: 'ket_qua_giai_quyet',
			width: 100,
			onCell,
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'created_at',
			width: 70,
			align: 'center',
			onCell,
		},
	];

	return (
		<ListForm
			url="vu-viec"
			columns={columns}
			ajax
			selectable={false}
			editable={false}
			filterBox
			filter={parseValues({
				thoiGian: [moment().clone().weekday(0).startOf('day'), moment().clone().weekday(6).endOf('day')],
			})}
			otherFilter={getFilters(authUser.ten_dang_nhap)}
			filterInitialValue={{
				thoiGian: [moment().clone().weekday(0).startOf('day'), moment().clone().weekday(6).endOf('day')],
			}}
			tuNgayDenNgay
			checkUserDoAction
			tableSize={{ x: 1200 }}
			modalWidth={1200}
			formTemplate={<FormItem />}
			formInitialValues={{
				ngay_ca_phuong: moment().startOf('day'),
				ngay_cqdt: moment().startOf('day'),
				loai_vu_viec: 'AĐ',
			}}
		/>
	);
};

export default React.memo(List);
