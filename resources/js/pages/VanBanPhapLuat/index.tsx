import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ListForm from '../../components/ListForm';
import { ColumnProps } from '../../components/ListForm/DataTable';
import { RootState } from '../../store';
import { downloadApi } from '../../utils/downloadFile';
import FormItem from './FormItem';

const List = () => {
	const authUser = useSelector((state: RootState) => state.authUserReducer);
	const [defaultFileList, setDefaultFileList] = useState<any[]>([]);

	const downloadFile = (id_van_ban: any, fileName: string) => {
		downloadApi(`/api/van-ban-phap-luat/${id_van_ban}/tai-file`, {}, fileName);
	};

	const handleEdit = (record: any) => {
		if (record.ten_file)
			setDefaultFileList([
				{
					uid: '1',
					name: record.ten_file,
					status: 'done',
				},
			]);
		else setDefaultFileList([]);
	};

	const columns: ColumnProps[] = [
		{
			title: 'Văn bản pháp luật',
			dataIndex: 'ten_van_ban',
			optFind: true,
			width: 180,
		},
		{
			title: 'Phân loại',
			dataIndex: 'phan_loai',
			width: 120,
			optFilter: true,
		},
		{
			title: 'Cơ quan ban hành',
			dataIndex: 'co_quan_ban_hanh',
			width: 120,
		},
		{
			title: 'Số hiệu',
			dataIndex: 'so_hieu',
			width: 100,
		},
		{
			title: 'Ngày ban hành',
			dataIndex: 'ngay_ban_hanh',
			align: 'center',
			width: 100,
			sorter: (a, b) =>
				moment(a.ngay_ban_hanh, 'DD/MM/YYYY').unix() - moment(b.ngay_ban_hanh, 'DD/MM/YYYY').unix(),
		},
		{
			title: 'Tập tin',
			dataIndex: 'ten_file',
			render: (text: string, record: any) => <a onClick={() => downloadFile(record.id, text)}>{text}</a>,
			width: 150,
		},
	];

	return (
		<ListForm
			url="van-ban-phap-luat"
			columns={columns}
			tableSize={{ x: 1000 }}
			selectable={false}
			insertable={authUser?.quan_tri}
			editable={authUser?.quan_tri}
			deleteable={authUser?.quan_tri}
			formTemplate={<FormItem defaultFileList={defaultFileList} />}
			handleEdit={handleEdit}
			hasUpload
			addStt
		/>
	);
};

export default React.memo(List);
