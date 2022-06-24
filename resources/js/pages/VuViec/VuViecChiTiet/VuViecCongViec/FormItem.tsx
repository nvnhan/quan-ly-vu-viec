import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import Select from 'antd/lib/select';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyDatePicker from '../../../../components/Controls/MyDatePicker';
import MyDebounceSelect, { SelectValue } from '../../../../components/Controls/MyDebounceSelect';
import { fetchNhomCongViec } from '../../../../reducers/nhomCongViec';
import { RootState } from '../../../../store';
import { TEN_MUC_DO_UU_TIEN } from '../../../../utils/constant';
import { required } from '../../../../utils/rules';
import { getSearchCanBo } from '../../../../utils/services';

const form = () => {
	const dispatch = useDispatch();
	const nhomCongViec = useSelector((state: RootState) => state.nhomCongViec);

	useEffect(() => {
		nhomCongViec.status === 'idle' && dispatch(fetchNhomCongViec());
	}, []);

	const fetchCanBoList = async (q: string): Promise<SelectValue[]> => {
		return getSearchCanBo({ q, l: 7 }).then((body) =>
			body?.data?.data.map((item: any) => ({
				label: `${item.ho_ten} - ${item.ten_chuc_vu} ${item.ten_don_vi}`,
				value: item.id,
			}))
		);
	};

	return (
		<Row gutter={[10, 0]}>
			<Col span={24}>
				<Form.Item name="ten_cong_viec" label="Tên công việc" rules={[required]}>
					<Input />
				</Form.Item>
			</Col>
			<Col span={24} sm={12}>
				<Form.Item name="id_nhom_cong_viec" label="Nhóm công việc">
					<Select allowClear>
						{nhomCongViec.list.map((item) => (
							<Select.Option value={item.id} key={item.id}>
								{item.value}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col span={24} sm={12}>
				<Form.Item name="muc_do_uu_tien" label="Mức độ ưu tiên">
					<Select>
						{TEN_MUC_DO_UU_TIEN.map((item) => (
							<Select.Option value={item.id} key={item.id}>
								{item.label}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col span={24}>
				<Form.Item name="noi_dung" label="Nội dung chi tiết">
					<Input.TextArea rows={5} />
				</Form.Item>
			</Col>

			<Col span={24}>
				<Form.Item name="sel_can_bo" label="Giao cho">
					<MyDebounceSelect placeholder="Chọn cán bộ thụ lý..." fetchOptions={fetchCanBoList} allowClear />
				</Form.Item>
			</Col>

			<Col span={24} sm={12}>
				<Form.Item name="ngay_het_han" label="Ngày hết hạn">
					<MyDatePicker format="DD/MM/YYYY" />
				</Form.Item>
			</Col>
		</Row>
	);
};

export default form;
