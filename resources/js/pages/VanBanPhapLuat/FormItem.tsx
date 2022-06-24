import UploadOutlined from '@ant-design/icons/UploadOutlined';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import message from 'antd/lib/message';
import Upload, { RcFile } from 'antd/lib/upload';
import React, { useState } from 'react';
import MyDatePicker from '../../components/Controls/MyDatePicker';
import { required } from '../../utils/rules';

const form = (props: any) => {
	const { defaultFileList } = props;
	const [fileList, setFileList] = useState<RcFile[]>(defaultFileList);

	const beforeUpload = (file: RcFile) => {
		const isLt2M = file.size / 1024 / 1024 < 5;
		if (!isLt2M) {
			message.error('Tập tin tải lên không được quá 5MB!');
		} else setFileList([file]);
		// return isLt2M;
		return false;
	};
	/**
	 * Remove selected file
	 */
	const onRemove = () => setFileList([]);

	return (
		<Row gutter={[10, 0]}>
			<Col span={24}>
				<Form.Item name="ten_van_ban" label="Tên văn bản" rules={[required]}>
					<Input />
				</Form.Item>
			</Col>
			<Col span={24} md={12}>
				<Form.Item name="phan_loai" label="Phân loại">
					<Input />
				</Form.Item>
			</Col>
			<Col span={24} md={12}>
				<Form.Item name="co_quan_ban_hanh" label="Cơ quan ban hành">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="so_hieu" label="Số hiệu">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="ngay_ban_hanh" label="Ngày ban hành">
					<MyDatePicker format="DD/MM/YYYY" />
				</Form.Item>
			</Col>
			<Col span={24}>
				<Form.Item name="file" label="Tập tin">
					<Upload
						beforeUpload={beforeUpload}
						listType="picture"
						maxCount={1}
						fileList={fileList}
						onRemove={onRemove}
					>
						<Button icon={<UploadOutlined />}>Chọn tập tin</Button>
					</Upload>
				</Form.Item>
			</Col>
		</Row>
	);
};

export default form;
