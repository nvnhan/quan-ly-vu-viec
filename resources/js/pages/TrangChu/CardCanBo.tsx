import Row from 'antd/lib/row';
import Card from 'antd/lib/card';
import React from 'react';
import Col from 'antd/lib/col';

const CardCanBo = (props: { nhan_vien: any }) => {
	return (
		<Card title="Cán bộ xuất sắc">
			<Row>
				<Col span={24}>Table</Col>
			</Row>
		</Card>
	);
};

export default CardCanBo;
