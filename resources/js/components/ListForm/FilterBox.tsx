import FilterOutlined from '@ant-design/icons/FilterOutlined';
import MinusOutlined from '@ant-design/icons/MinusOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import Button from 'antd/lib/button/index';
import Form from 'antd/lib/form/index';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ListFormProps } from '.';
import { parseValues } from '../../utils';
import MyRangePicker from '../Controls/MyRangePicker';

export interface FilterProps {
	name: string;
	label: string;
	render: JSX.Element;
	alwaysShow?: boolean;
	isLarger?: boolean;
	tooltip?: { title: string; icon: any };
}

interface ComponentProps extends ListFormProps {
	onFilter: (props: any) => void;
}
const FilterBox = (props: ComponentProps) => {
	const { onFilter, tuNgayDenNgay, otherFilter, filterInitialValue } = props;
	const [form] = Form.useForm();
	const [expandFilter, setExpandFilter] = useState(false);

	const alwaysShowFilters = otherFilter?.filter((fil) => fil.alwaysShow);
	const hideFilters = otherFilter?.filter((fil) => !fil.alwaysShow);

	useEffect(() => {
		form.setFieldsValue({
			// thoiGian: [moment().startOf('month'), moment().endOf('month')],
			...filterInitialValue,
		});
	}, []);

	const onFinish = () => {
		let values = form.getFieldsValue();
		onFilter(parseValues(values));
	};

	const renderSingleFilter = (filter: FilterProps) =>
		filter.isLarger ? (
			<Col span={24} md={16} lg={12} xl={10} key={filter.name}>
				<Form.Item
					name={filter.name}
					label={filter.label}
					tooltip={filter.tooltip}
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 20 }}
				>
					{filter.render}
				</Form.Item>
			</Col>
		) : (
			<Col span={12} md={8} lg={6} xl={5} key={filter.name}>
				<Form.Item name={filter.name} label={filter.label}>
					{filter.render}
				</Form.Item>
			</Col>
		);

	return (
		<div className="filter-box">
			<Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
				<Row gutter={[5, 5]}>
					{tuNgayDenNgay && (
						<Col span={24} md={16} lg={12} xl={10}>
							<Form.Item
								name="thoiGian"
								label="Thời gian"
								labelCol={{ span: 4 }}
								wrapperCol={{ span: 20 }}
							>
								<MyRangePicker {...props} />
							</Form.Item>
						</Col>
					)}

					{alwaysShowFilters && !isEmpty(alwaysShowFilters) && alwaysShowFilters.map(renderSingleFilter)}

					{hideFilters && !isEmpty(hideFilters) && expandFilter && hideFilters.map(renderSingleFilter)}

					<Col span={12} md={8} lg={6} xl={4}>
						{!isEmpty(hideFilters) && (
							<Button onClick={() => setExpandFilter(!expandFilter)} type="dashed">
								{expandFilter ? <MinusOutlined /> : <PlusOutlined />}
							</Button>
						)}
						<Button htmlType="submit">
							<FilterOutlined />
							Lọc
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default React.memo(FilterBox);
