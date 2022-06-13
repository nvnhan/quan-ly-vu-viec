import Tag from 'antd/lib/tag/index';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import ListForm from '../../../components/ListForm';
import { ColumnProps } from '../../../components/ListForm/DataTable';
import { RootState } from '../../../store';
import { parseValues } from '../../../utils';
import FormItem from './FormItem';
import getFilters from './otherFilters';

const List = () => {
	const authUser = useSelector((state: RootState) => state.authUserReducer);

	const columns: ColumnProps[] = [
		{
			title: 'TT',
			dataIndex: 'id',
			width: 30,
			render: (text, record, index) => index !== undefined && <b>{index + 1}</b>,
			align: 'center',
		},
		{
			title: 'Tên vụ việc',
			dataIndex: 'ten_vu_viec',
			width: 150,
		},
		{
			title: 'Phân loại',
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
				{
					text: 'AĐ',
					value: 'AĐ',
				},
				{
					text: 'AK',
					value: 'AK',
				},
			],
		},
		{
			title: 'Phân loại tin',
			dataIndex: 'phan_loai_tin',
			width: 100,
			// optFilter: true,
		},
		{
			title: 'Xảy ra',
			dataIndex: 'thoi_diem_xay_ra',
			render: (text: string, record: any) => (
				<>
					Thời điểm xảy ra: {text}
					<br />
					Tại: {record.noi_xay_ra}
				</>
			),
			width: 150,
		},
		{
			title: 'Kết quả giải quyết',
			dataIndex: 'ket_qua_giai_quyet',
			width: 100,
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'created_at',
			width: 80,
		},
	];

	const hanldeChangeData = (data: any[], query?: object) => {};

	return (
		<ListForm
			url="vu-viec"
			columns={columns}
			ajax
			selectable={false}
			insertable
			deleteable
			editable
			filterBox
			filter={parseValues({
				thoiGian: [moment().clone().weekday(0).startOf('day'), moment().clone().weekday(6).endOf('day')],
			})}
			onChangeData={hanldeChangeData}
			otherFilter={getFilters(authUser.ten_dang_nhap)}
			filterInitialValue={{
				thoiGian: [moment().clone().weekday(0).startOf('day'), moment().clone().weekday(6).endOf('day')],
			}}
			tuNgayDenNgay
			checkUserDoAction
			tableSize={{ x: 1000 }}
			modalWidth={1200}
			formTemplate={<FormItem />}
		/>
	);
};

export default React.memo(List);
