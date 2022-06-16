import message from 'antd/lib/message';
import Checkbox from 'antd/lib/checkbox/index';
import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Input from 'antd/lib/input/index';
import Select from 'antd/lib/select/index';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyDebounceSelect, { SelectValue } from '../../../components/Controls/MyDebounceSelect';
import { fetchCapBac } from '../../../reducers/capBac';
import { RootState } from '../../../store';
import { numberCharacter, required } from '../../../utils/rules';
import { checkName, getSearchDonVi } from '../../../utils/services';

const form = () => {
	const dispatch = useDispatch();
	const capBac = useSelector((state: RootState) => state.capBac);

	const chucVu = [
		{ id: 0, value: 'Cán bộ' },
		{ id: 1, value: 'Đội phó' },
		{ id: 2, value: 'Tổng hợp đội' },
		{ id: 3, value: 'Đội trưởng' },
		{ id: 4, value: 'Giúp việc PTT' },
		{ id: 5, value: 'Lãnh đạo' },
		{ id: 9, value: 'Quản trị viên' },
	];

	useEffect(() => {
		capBac.status === 'idle' && dispatch(fetchCapBac());
	}, []);

	const onSearch = async (value: string) => {
		await checkName(value)
			.then(({ data }) => (data.success ? message.info(data.message) : message.error(data.message)))
			.catch((error) => console.log(error));
	};

	const fetchDonViList = async (username: string): Promise<SelectValue[]> => {
		return getSearchDonVi({ q: username, l: 7 }).then((body) =>
			body?.data?.data.map((item: any) => ({
				label: item.ten_don_vi_day_du,
				value: item.id,
			}))
		);
	};

	return (
		<Row gutter={[12, 0]}>
			<Col span={12}>
				<Form.Item name="ho_ten" label="Họ tên" rules={[required]}>
					<Input placeholder="Nhập họ tên cán bộ" />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item
					name="ten_dang_nhap"
					label="Tài khoản đăng nhập"
					tooltip="Không thể thay đổi sau khi thêm mới"
					rules={[required, numberCharacter]}
				>
					<Input.Search placeholder="Nhập tên đăng nhập" onSearch={onSearch} />
				</Form.Item>
			</Col>
			<Col span={12} sm={6}>
				<Form.Item name="id_cap_bac" label="Cấp bậc" rules={[required]}>
					<Select>
						{capBac.list.map((item) => (
							<Select.Option value={item.id} key={item.id}>
								{item.value}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col span={12} sm={6}>
				<Form.Item name="chuc_vu" label="Chức vụ / Vai trò" rules={[required]}>
					<Select>
						{chucVu.map((item) => (
							<Select.Option value={item.id} key={item.id}>
								{item.value}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="chuc_danh_lanh_dao" label="Chức danh lãnh đạo">
					<Input />
				</Form.Item>
			</Col>
			<Col span={24}>
				<Form.Item name="sel_don_vi" label="Đơn vị công tác" rules={[required]}>
					<MyDebounceSelect placeholder="Chọn đơn vị: Tổ, đội, xã/phường" fetchOptions={fetchDonViList} />
				</Form.Item>
			</Col>

			<Col span={12}>
				<Form.Item name="sdt" label="Số điện thoại">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="dia_chi" label="Địa chỉ">
					<Input />
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="dieu_tra_vien" valuePropName="checked">
					<Checkbox>Chức danh điều tra viên</Checkbox>
				</Form.Item>
			</Col>
			<Col span={12}>
				<Form.Item name="khoa_tai_khoan" valuePropName="checked">
					<Checkbox>Khóa tài khoản</Checkbox>
				</Form.Item>
			</Col>
		</Row>
	);
};

export default form;
