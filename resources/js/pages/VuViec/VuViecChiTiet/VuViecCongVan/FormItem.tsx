import Select from 'antd/lib/select';
import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import React, { useEffect } from 'react';
import MyDatePicker from '../../../../components/Controls/MyDatePicker';
import MyDebounceSelect, { SelectValue } from '../../../../components/Controls/MyDebounceSelect';
import { required } from '../../../../utils/rules';
import { getSearchCanBo } from '../../../../utils/services';

const form = (props: { recordCha?: { id: number; name: string } }) => {
	const { recordCha } = props;

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
			{recordCha && (
				<Col span={24}>
					<Form.Item name="id_cong_van_cha" label="Công văn chính" initialValue={recordCha.id}>
						<Select disabled>
							<Select.Option value={recordCha.id}>{recordCha.name}</Select.Option>
						</Select>
					</Form.Item>
				</Col>
			)}
			<Col span={24}>
				<Form.Item name="tieu_de" label="Tiêu đề công văn" rules={[required]}>
					<Input />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="so_hieu" label="Số hiệu văn bản">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="ngay_ban_hanh" label="Ngày ban hành">
					<MyDatePicker format="DD/MM/YYYY" />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="han_tra_loi" label="Hạn trả lời">
					<MyDatePicker format="DD/MM/YYYY" />
				</Form.Item>
			</Col>

			{!recordCha && (
				<>
					<Col span={12}>
						<Form.Item name="co_quan_nhan" label="Nơi nhận">
							<Input />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item name="so_cong_van_phan_hoi" label="Số CV phản hồi">
							<Input />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="ngay_phan_hoi" label="Ngày phản hồi">
							<MyDatePicker format="DD/MM/YYYY" />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="noi_dung_phan_hoi" label="Nội dung phản hồi">
							<Input.TextArea />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="sel_can_bo" label="Cán bộ thụ lý">
							<MyDebounceSelect
								allowClear
								placeholder="Tìm theo tên cán bộ..."
								fetchOptions={fetchCanBoList}
							/>
						</Form.Item>
					</Col>
				</>
			)}
		</Row>
	);
};

export default form;
