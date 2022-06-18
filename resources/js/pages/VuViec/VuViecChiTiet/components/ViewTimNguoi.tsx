import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';
import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import React from 'react';
import MyDebounceSelect, { SelectValue } from '../../../../components/Controls/MyDebounceSelect';
import { required } from '../../../../utils/rules';
import { getApi, getSearchNguoi } from '../../../../utils/services';

const ViewTimNguoi = (props: { onSetNguoi: any; id_vu_viec: any }) => {
	const [form] = Form.useForm();
	const { onSetNguoi, id_vu_viec } = props;

	const fetchNguoiList = async (q: string): Promise<SelectValue[]> => {
		return getSearchNguoi({ q, l: 10, vv: id_vu_viec }).then((body) =>
			body?.data?.data.map((item: any) => ({
				label: `${item.ho_ten} (${item.ngay_sinh_day_du}), ${item.so_dinh_danh}, ${item.ten_thuong_tru}`,
				value: item.id,
			}))
		);
	};

	const onFinish = (values: any) => {
		getApi('nguoi/' + values.sel_nguoi_lien_quan.value)
			.then((response) => {
				if (response.data.success) onSetNguoi(response.data.data);
			})
			.catch((error) => console.log(error));
	};

	return (
		<Form form={form} onFinish={onFinish}>
			<Row gutter={[12, 5]}>
				<Col span={24} sm={20}>
					<Form.Item label="Tìm người liên quan" name="sel_nguoi_lien_quan" rules={[required]}>
						<MyDebounceSelect
							allowClear
							placeholder="Tìm theo họ tên hoặc số định danh của người đã được lưu trong dữ liệu"
							fetchOptions={fetchNguoiList}
						/>
					</Form.Item>
				</Col>
				<Col span={24} sm={4}>
					<Button htmlType="submit">
						<ArrowDownOutlined /> Chọn
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default ViewTimNguoi;
