import Row from 'antd/lib/row';
import Card from 'antd/lib/card';
import React from 'react';
import Col from 'antd/lib/col';
import Pie from '@ant-design/plots/lib/components/pie';

const CardCongViec = (props: any) => {
	const data = [
		{
			type: 'Hoàn thành đúng thời hạn',
			value: props?.hoan_thanh_dung_han,
		},
		{
			type: 'Hoàn thành quá hạn',
			value: props?.hoan_thanh_qua_han,
		},
		{
			type: 'Chờ đánh giá',
			value: props?.cho_danh_gia,
		},
		{
			type: 'Đang tiến hành',
			value: props?.thuc_hien,
		},
		{
			type: 'Đã hủy',
			value: props?.huy,
		},
	];

	const config = {
		appendPadding: 10,
		data,
		angleField: 'value',
		colorField: 'type',
		radius: 1,
		innerRadius: 0.8,
		label: {
			type: 'inner',
			offset: '-50%',
			content: '{value}',
			style: {
				textAlign: 'center',
				fontSize: 14,
			},
		},
		interactions: [
			{
				type: 'element-selected',
			},
			{
				type: 'element-active',
			},
		],
	};

	return (
		<Card title="Trạng thái công việc" bodyStyle={{ padding: '5px 10px' }}>
			<Row>
				<Col span={24}>
					<Pie
						height={474}
						{...config}
						statistic={{
							title: false,
							content: {
								style: {
									fontSize: '20px',
								},
								content: props?.tong_so + '\nCông việc',
							},
						}}
						legend={{ position: 'bottom', maxRow: 5 }}
					/>
				</Col>
			</Row>
		</Card>
	);
};

export default CardCongViec;
