import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import Select from 'antd/lib/select/index';
import React from 'react';
import MyDebounceSelect, { SelectValue } from '../../../components/Controls/MyDebounceSelect';
import { required } from '../../../utils/rules';
import { getSearchDonVi } from '../../../utils/services';

const form = () => {
	const loaiDonVi = ['Tổ', 'Đội', 'Xã', 'Phường', 'Thị trấn'];

	const fetchDonViList = async (q: string): Promise<SelectValue[]> => {
		return getSearchDonVi({ q, l: 7, type: 1 }).then((body) =>
			body?.data?.data.map((item: any) => ({
				label: item.ten_don_vi_day_du,
				value: item.id,
			}))
		);
	};

	return (
		<Row gutter={[12, 0]}>
			<Col span={12}>
				<Form.Item name="ten_don_vi" label="Tên đơn vị" rules={[required]}>
					<Input placeholder="Nhập tên đơn vị" />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="loai_don_vi" label="Loại đơn vị" rules={[required]}>
					<Select>
						{loaiDonVi.map((item: any, index: number) => (
							<Select.Option value={item} key={index}>
								{item}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="ma_don_vi" label="Mã đơn vị">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="loai_co_quan" label="Loại cơ quan">
					<Select allowClear>
						<Select.Option value="CSĐT">CSĐT</Select.Option>
						<Select.Option value="ANĐT">ANĐT</Select.Option>
					</Select>
				</Form.Item>
			</Col>
			<Col span={24}>
				<Form.Item name="sel_don_vi_cha" label="Đơn vị trực thuộc">
					<MyDebounceSelect
						placeholder="Chọn đơn vị: Đội, xã/phường"
						allowClear
						fetchOptions={fetchDonViList}
					/>
				</Form.Item>
			</Col>
		</Row>
	);
};

export default form;
