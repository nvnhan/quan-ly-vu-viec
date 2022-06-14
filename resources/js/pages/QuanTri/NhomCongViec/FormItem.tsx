import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import React from 'react';
import { required } from '../../../utils/rules';

const form = () => {
	return (
		<Row gutter={[10, 5]}>
			<Col span={24}>
				<Form.Item name="nhom_cong_viec" label="Tên nhóm công việc" rules={[required]}>
					<Input />
				</Form.Item>
			</Col>
		</Row>
	);
};

export default form;
