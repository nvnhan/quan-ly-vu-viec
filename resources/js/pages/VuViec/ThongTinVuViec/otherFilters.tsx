import Select from 'antd/lib/select';
import Input from 'antd/lib/input/index';
import React from 'react';
import { FilterProps } from '../../../components/ListForm/FilterBox';
import { PHUONG_THUC_PHAM_TOI } from '../../../utils/constant';

const getFilters = (): FilterProps[] => {
	const filters: FilterProps[] = [
		{
			name: 'q',
			label: 'Tìm kiếm',
			render: <Input placeholder="Nhập thông tin tìm kiếm" />,
			// alwaysShow: true,
			// isLarger: true,
		},
		{
			name: 'phuong_thuc_pham_toi',
			label: 'PT phạm tội',
			render: (
				<Select allowClear showSearch placeholder="Phương thức phạm tội">
					{PHUONG_THUC_PHAM_TOI.map((phuong_thuc, index) => (
						<Select.Option key={index} value={phuong_thuc}>
							{phuong_thuc}
						</Select.Option>
					))}
				</Select>
			),
			// alwaysShow: true,
			// isLarger: true,
		},
	];
	return filters;
};

export default getFilters;
