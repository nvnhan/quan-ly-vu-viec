import { InfoCircleOutlined } from '@ant-design/icons';
import Input from 'antd/lib/input/index';
import Select from 'antd/lib/select/index';
import React from 'react';
import { FilterProps } from '../../../components/ListForm/FilterBox';
const { Option } = Select;

const getFilters = (username: string): FilterProps[] => {
	const filters: FilterProps[] = [
		{
			name: 'q',
			label: 'Tìm kiếm',
			render: <Input placeholder="Nhập thông tin tìm kiếm" />,
			alwaysShow: true,
		},
	];
	// if (username !== '')
	// 	filters.push({
	// 		name: 'u',
	// 		label: 'Hiển thị',
	// 		render: (
	// 			<Select>
	// 				<Option value="">Tất cả</Option>
	// 				<Option value={username}>Riêng tôi</Option>
	// 			</Select>
	// 		),
	// 		alwaysShow: true,
	// 	});
	return filters;
};

export default getFilters;
