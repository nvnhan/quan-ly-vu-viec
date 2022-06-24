import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import Select from 'antd/lib/select';
import React from 'react';
import { TEN_TRANG_THAI_CONG_VIEC } from '../../../../utils/constant';

const FormStatus = (props: any) => {
	const { status } = props;

	return (
		<Row gutter={[10, 0]}>
			<Col span={24}>
				<Form.Item name="ten_cong_viec" label="Tên công việc">
					<Input disabled />
				</Form.Item>
			</Col>

			<Col span={24} sm={12}>
				<Form.Item name="trang_thai" label="Trạng thái">
					<Select disabled>
						{TEN_TRANG_THAI_CONG_VIEC.map((item) => (
							<Select.Option value={item.id} key={item.id}>
								{item.label}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Col>

			{status.id === 4 ? (
				<Col span={24}>
					<Form.Item name="ket_qua" label="Kết quả thực hiện">
						<Input.TextArea rows={5} />
					</Form.Item>
				</Col>
			) : (
				<Col span={24}>
					<Form.Item name="phe_duyet" label="Ý kiến phê duyệt">
						<Input.TextArea rows={5} />
					</Form.Item>
				</Col>
			)}
		</Row>
	);
};

export default FormStatus;
