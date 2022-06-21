import UploadOutlined from '@ant-design/icons/UploadOutlined';
import message from 'antd/lib/message';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import Select from 'antd/lib/select';
import Upload, { RcFile } from 'antd/lib/upload';
import React, { useEffect, useState } from 'react';
import { required } from '../../../../utils/rules';
import { getApi } from '../../../../utils/services';

const form = (props: any) => {
	const [congViecList, setCongViecList] = useState<{ id: number; name: string }[]>([]);
	const { vuViec } = props;
	const [fileList, setFileList] = useState<RcFile[]>([]);

	useEffect(() => {
		getApi(`cong-viec?vu_viec=${vuViec}`).then((response) => {
			if (response.data.success)
				setCongViecList(
					response.data.data.map((item: any) => ({
						id: item.id,
						name: item.ten_nhom_cong_viec + ' - ' + item.ten_cong_viec,
					}))
				);
		});
	}, [vuViec]);

	const beforeUpload = (file: RcFile) => {
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Tập tin tải lên không được quá 2MB!');
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
				<Form.Item name="ten_tai_lieu" label="Tên tài liệu" rules={[required]}>
					<Input />
				</Form.Item>
			</Col>
			<Col span={24}>
				<Form.Item name="id_cong_viec" label="Công việc báo cáo">
					<Select allowClear>
						{congViecList.map((item) => (
							<Select.Option value={item.id} key={item.id}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col span={24}>
				<Form.Item name="noi_dung" label="Nội dung">
					<Input.TextArea />
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
