import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Select from 'antd/lib/select';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLanhDao } from '../../../../reducers/lanhDao';
import { RootState } from '../../../../store';
import { required } from '../../../../utils/rules';

const form = () => {
	const dispatch = useDispatch();
	const lanhDao = useSelector((state: RootState) => state.lanhDao);

	useEffect(() => {
		lanhDao.status === 'idle' && dispatch(fetchLanhDao());
	}, []);

	return (
		<Row gutter={[10, 5]}>
			<Col span={24}>
				<Form.Item name="lanh_dao" label="Lãnh đạo phụ trách" rules={[required]}>
					<Select placeholder="Chọn lãnh đạo...">
						{lanhDao.list.map((td, index) => (
							<Select.Option value={td.id} key={index}>
								{td.value}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Col>
		</Row>
	);
};

export default form;
