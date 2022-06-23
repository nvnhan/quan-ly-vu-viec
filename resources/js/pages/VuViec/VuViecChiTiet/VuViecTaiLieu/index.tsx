import Typography from 'antd/lib/typography';
import React, { useState } from 'react';
import ListForm from '../../../../components/ListForm';
import { ColumnProps } from '../../../../components/ListForm/DataTable';
import { downloadApi } from '../../../../utils/downloadFile';
import FormItem from './FormItem';

const List = (props: { vuViec: any }) => {
	const { vuViec } = props;
	const [defaultFileList, setDefaultFileList] = useState<any[]>([]);

	const downloadFile = (id_tai_lieu: any, fileName: string) => {
		downloadApi(`/api/tai-lieu/${id_tai_lieu}/tai-file`, {}, fileName);
	};

	const handleEdit = (record: any) => {
		setDefaultFileList([
			{
				uid: '1',
				name: record.ten_file,
				status: 'done',
			},
		]);
	};

	const columns: ColumnProps[] = [
		{
			title: 'TT',
			dataIndex: 'id',
			width: 30,
			render: (text, record, index) => index !== undefined && <b>{index + 1}</b>,
			align: 'center',
		},
		{
			title: 'Tên tài liệu',
			dataIndex: 'ten_tai_lieu',
			optFind: true,
			width: 180,
		},
		{
			title: 'Công việc báo cáo',
			dataIndex: 'ten_cong_viec',
			optFilter: true,
			width: 120,
		},
		{
			title: 'Nội dung',
			dataIndex: 'noi_dung',
			// optFind: true,
			render: (text: string) => <Typography.Paragraph ellipsis={{ rows: 3 }}>{text}</Typography.Paragraph>,
			width: 250,
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
			optFilter: true,
			width: 100,
		},
		{
			title: 'Ngày đăng',
			dataIndex: 'created_at',
			width: 80,
		},
	];

	return (
		<ListForm
			formClass=""
			url="tai-lieu"
			columns={columns}
			tableSize={{ x: 850 }}
			filter={{ vu_viec: vuViec }}
			otherParams={{ id_vu_viec: vuViec }}
			selectable={false}
			formTemplate={<FormItem vuViec={vuViec} defaultFileList={defaultFileList} />}
			hasUpload
			handleEdit={handleEdit}
		/>
	);
};

export default React.memo(List);
