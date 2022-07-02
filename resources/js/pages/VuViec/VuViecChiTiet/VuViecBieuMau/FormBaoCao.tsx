import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Select from 'antd/lib/select';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLanhDao } from '../../../../reducers/lanhDao';
import { RootState } from '../../../../store';
import { required } from '../../../../utils/rules';

const form = (props: { listNguoi?: any[]; typeBaoCao?: BieuMau.Item }) => {
	const dispatch = useDispatch();
	const lanhDao = useSelector((state: RootState) => state.lanhDao);
	const { listNguoi, typeBaoCao } = props;

	useEffect(() => {
		lanhDao.status === 'idle' && dispatch(fetchLanhDao());
	}, []);

	return (
		<Row gutter={[10, 5]}>
			<Col span={24}>
				<h3>{typeBaoCao?.name}</h3>
			</Col>
			<Col span={24}>
				<Form.Item name="lanh_dao" label="Lãnh đạo ký" rules={typeBaoCao?.lanh_dao ? [required] : undefined}>
					<Select placeholder="Chọn lãnh đạo...">
						{lanhDao.list.map((td, index) => (
							<Select.Option value={td.id} key={index}>
								{td.value}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col span={24}>
				<Form.Item name="nguoi" label="Người trong vụ">
					<Select placeholder="Chọn người để báo cáo...">
						{listNguoi?.map((nguoi, index) => (
							<Select.Option value={nguoi.id} key={index}>
								{nguoi.ho_ten} ({nguoi.nam_sinh}) - {nguoi.ten_thuong_tru}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Col>
		</Row>
	);
};

export default form;
