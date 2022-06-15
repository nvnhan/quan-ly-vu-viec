import DatePicker from 'antd/lib/date-picker/index';
import React from 'react';
import moment from 'moment';

const MyDatePicker = (props: any) => {
	if (props.value && typeof props.value == 'string') {
		let objMoment = moment(props.value, props.format);
		return <DatePicker style={{ width: '100%' }} {...props} value={objMoment} />;
	} else return <DatePicker style={{ width: '100%' }} {...props} />;
};

export default MyDatePicker;
