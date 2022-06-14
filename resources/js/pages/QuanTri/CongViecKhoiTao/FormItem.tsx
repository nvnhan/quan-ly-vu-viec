import Select from 'antd/lib/select';
import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNhomCongViec } from '../../../reducers/nhomCongViec';
import { RootState } from '../../../store';
import { required } from '../../../utils/rules';

const form = () => {
	const dispatch = useDispatch();
	const nhomCongViec = useSelector((state: RootState) => state.nhomCongViec);

	useEffect(() => {
		nhomCongViec.status === 'idle' && dispatch(fetchNhomCongViec());
	}, []);

	return (
		<Row gutter={[10, 5]}>
			<Col span={24} sm={12}>
				<Form.Item name="loai_vu_viec" label="Loại vụ việc" rules={[required]}>
					<Select>
						<Select.Option value="AĐ">AĐ</Select.Option>
						<Select.Option value="AK">AK</Select.Option>
					</Select>
				</Form.Item>
			</Col>
			<Col span={24} sm={12}>
				<Form.Item name="id_nhom_cong_viec" label="Nhóm công việc">
					<Select allowClear>
						{nhomCongViec.list.map((ncv) => (
							<Select.Option value={ncv.id} key={ncv.id}>
								{ncv.nhom_cong_viec}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col span={24}>
				<Form.Item name="ten_cong_viec" label="Tên công việc" rules={[required]}>
					<Input />
				</Form.Item>
			</Col>
			<Col span={24} sm={12}>
				<Form.Item name="thoi_han" label="Thời hạn">
					<Input />
				</Form.Item>
			</Col>
		</Row>
	);
};

export default form;
