import Row from 'antd/lib/row';
import Card from 'antd/lib/card';
import React from 'react';
import Col from 'antd/lib/col';

const CardTitle = (props: { title: string; subTitle: string; amount: number }) => {
	return (
		<Card title={props.title}>
			<Row>
				<Col span={24} md={12} className="amount">
					{props.amount}
				</Col>
				<Col span={24} md={12} className="sub-title">
					{props.subTitle}
				</Col>
			</Row>
		</Card>
	);
};

export default CardTitle;
