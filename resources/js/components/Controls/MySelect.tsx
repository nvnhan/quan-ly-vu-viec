import Select from 'antd/lib/select';
import React from 'react';

export interface MySelectProps {
	placeholder?: string;
	onChange?: () => void;
	value?: string;
	options?: JSX.Element;
}

const MySelect = ({ placeholder, onChange, value, options }: MySelectProps) => (
	<Select
		showSearch
		allowClear
		filterOption={(input: string, option: any) => {
			if (!option.children) return false;
			let child = Array.isArray(option.children) ? option.children.join('') : option.children;
			return child.toLowerCase().indexOf(input.toLowerCase()) >= 0;
		}}
		placeholder={placeholder}
		onChange={onChange}
		value={value}
	>
		{options}
	</Select>
);

export default React.memo(MySelect);
