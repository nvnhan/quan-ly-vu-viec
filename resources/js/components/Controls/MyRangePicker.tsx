import DatePicker from 'antd/lib/date-picker/index';
import locale from 'antd/lib/date-picker/locale/vi_VN';
import React from 'react';
import { momentRange } from '../../utils';
import { ListFormProps } from '../ListForm';
const { RangePicker } = DatePicker;

const MyRangePicker = (props: Partial<ListFormProps>) => (
	<RangePicker
		allowClear={true}
		style={{ width: '100%' }}
		ranges={momentRange()}
		locale={locale}
		format="DD/MM/YYYY"
		placeholder={['Từ ngày', 'đến ngày']}
		{...props}
	/>
);

export default MyRangePicker;
