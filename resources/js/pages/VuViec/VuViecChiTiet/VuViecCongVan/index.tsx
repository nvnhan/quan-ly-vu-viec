import Typography from 'antd/lib/typography';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import ListForm, { ListFormRef } from '../../../../components/ListForm';
import { ColumnProps, OtherActionProps } from '../../../../components/ListForm/DataTable';
import FormItem from './FormItem';
import DoubleRightOutlined from '@ant-design/icons/DoubleRightOutlined';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const List = (props: { vuViec: any }) => {
	const authUser = useSelector((state: RootState) => state.authUserReducer);
	const [recordCha, setRecordCha] = useState<
		| {
				id: number;
				name: string;
		  }
		| undefined
	>(undefined);
	const { vuViec } = props;
	const ref = useRef<ListFormRef>(null);

	const columns: ColumnProps[] = [
		{
			title: 'Tiêu đề văn bản',
			dataIndex: 'tieu_de',
			optFind: true,
			width: 180,
		},
		{
			title: 'Mô tả',
			dataIndex: 'mo_ta',
			optFind: true,
			width: 120,
		},
		{
			title: 'Số hiệu',
			dataIndex: 'so_hieu',
			align: 'center',
			width: 80,
		},
		{
			title: 'Ngày ban hành',
			dataIndex: 'ngay_ban_hanh',
			align: 'center',
			width: 80,
		},
		{
			title: 'Nơi nhận',
			dataIndex: 'co_quan_nhan',
			width: 120,
		},
		{
			title: 'Hạn trả lời',
			dataIndex: 'han_tra_loi',
			align: 'center',
			width: 80,
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
			width: 200,
		},
		{
			title: 'Cán bộ thụ lý',
			dataIndex: 'ten_can_bo_thu_ly',
			optFilter: true,
			width: 100,
		},
	];

	const hanldeThemDonDoc = (record: any) => {
		if (!record.id_cong_van_cha) {
			setRecordCha({
				id: record.id,
				name: record.tieu_de,
			});
		} else setRecordCha({ id: record.id_cong_van_cha, name: record.ten_cong_van_cha });
		ref.current?.triggerInsert();
	};

	/**
	 * When edit any record in Listform
	 * @param record
	 * @returns
	 */
	const handleEdit = (record: any) =>
		record.id_cong_van_cha
			? setRecordCha({ id: record.id_cong_van_cha, name: record.ten_cong_van_cha })
			: setRecordCha(undefined);

	const otherActions: OtherActionProps[] = [
		{
			key: 'don-doc',
			title: 'Thêm công văn đôn đốc',
			onClick: hanldeThemDonDoc,
			icon: <DoubleRightOutlined />,
			color: '#518F3C',
		},
	];

	return (
		<ListForm
			ref={ref}
			formClass=""
			url="cong-van"
			columns={columns}
			otherActions={otherActions}
			tableSize={{ x: 1400 }}
			filter={{ vu_viec: vuViec }}
			otherParams={{ id_vu_viec: vuViec }}
			selectable={false}
			formTemplate={<FormItem recordCha={recordCha} authUser={authUser} />}
			formInitialValues={{
				ngay_ban_hanh: moment().format('DD/MM/YYYY'),
				tieu_de: recordCha?.id ? 'Công văn đôn đốc' : '',
			}}
			handleEdit={handleEdit}
			addStt
		/>
	);
};

export default React.memo(List);
