import Button from 'antd/lib/button/index';
import message from 'antd/lib/message/index';
import Modal from 'antd/lib/modal/index';
import Table from 'antd/lib/table/index';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ColumnProps } from '../../../components/ListForm/DataTable';
import { vndFormater } from '../../../utils';

interface ComponentProps {
	tenFile: string;
	handleCancel: () => void;
	modalVisible: boolean;
}
const ModalPreview = ({ tenFile, handleCancel, modalVisible }: ComponentProps) => {
	const [dataDinhDanh, setDataDinhDanh] = useState({
		isLoading: true,
		data: [],
	});

	useEffect(() => {
		tenFile !== '' &&
			axios
				.get('/api/dinh-danh?dd=' + tenFile)
				.then(
					(response) =>
						response.data.success &&
						setDataDinhDanh({
							isLoading: false,
							data: response.data.data,
						})
				)
				.catch((error) => console.log(error));
	}, [tenFile]);

	const handleOk = () => {
		message.success('Done');
		// props.history.push({
		// 	pathname: '/dinh-danh',
		// 	dd: tenFile,
		// });
	};

	const handleAbort = () => {
		axios.delete(`/api/dinh-danh/deletes`, {
			params: {
				dd: tenFile,
			},
		});
		// .then((response) => response.data.success && message.success(response.data.message) && handleCancel())
		// .catch((error) => console.log(error));
	};

	const columns: ColumnProps[] = [
		{
			title: 'Họ tên',
			dataIndex: 'ho_ten',
			width: 150,
		},
		{
			title: 'Giá gốc',
			dataIndex: 'gia_tien',
			render: (number) => vndFormater.format(number),
			width: 100,
		},
		{
			title: 'Giá bán',
			dataIndex: 'gia_ban',
			render: (number) => vndFormater.format(number),
			width: 100,
		},
		{
			title: 'Hãng',
			dataIndex: 'hang_bay',
			width: 80,
		},
		{
			title: 'F1',
			dataIndex: 'f1',
			width: 120,
		},
		{
			title: 'SĐT',
			dataIndex: 'sdt',
			width: 100,
		},
		{
			title: 'Ghi chú',
			dataIndex: 'ghi_chu',
			ellipsis: true,
			width: 150,
		},
	];

	return (
		<Modal
			width="1000px"
			visible={modalVisible}
			title="Dữ liệu xử lý được"
			onOk={handleOk}
			onCancel={handleCancel}
			footer={[
				<Button key="back" onClick={handleCancel}>
					Xử lý tiếp
				</Button>,
				<Button key="cancel" danger onClick={handleAbort}>
					Loại bỏ
				</Button>,
				<Button key="submit" type="primary" onClick={handleOk}>
					Xem chi tiết
				</Button>,
			]}
		>
			<Table
				dataSource={dataDinhDanh.data}
				columns={columns as any[]}
				loading={dataDinhDanh.isLoading}
				rowKey={(row) => row['id']}
				scroll={{ x: 800 }}
			/>
		</Modal>
	);
};
export default React.memo(ModalPreview);
