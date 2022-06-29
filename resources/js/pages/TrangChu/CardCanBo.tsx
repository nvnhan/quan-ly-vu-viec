import Row from 'antd/lib/row';
import Card from 'antd/lib/card';
import React, { useEffect, useState } from 'react';
import Col from 'antd/lib/col';
import List from 'antd/lib/list';
import Avatar from 'antd/lib/avatar';
import UserOutlined from '@ant-design/icons/UserOutlined';
import Progress from 'antd/lib/progress';

export interface CanBoXuatSac {
	id: number;
	ho_ten: string;
	tong_cong_viec: number;
	cong_viec_hoan_thanh: number;
	ti_le?: number;
}

const CardCanBo = (props: { nhan_vien?: CanBoXuatSac[] }) => {
	const { nhan_vien } = props;
	const [data, setData] = useState<CanBoXuatSac[]>([]);

	useEffect(() => {
		const newData: CanBoXuatSac[] =
			nhan_vien?.map((nv) => ({
				...nv,
				ti_le: (nv.cong_viec_hoan_thanh * 100) / nv.tong_cong_viec,
			})) ?? [];
		newData.sort((a, b) => (b.ti_le ?? 0) - (a.ti_le ?? 0));
		// .sort((a, b) => (b.tong_cong_viec ?? 0) - (a.tong_cong_viec ?? 0));
		setData(newData.slice(0, 5));
	}, [nhan_vien]);

	return (
		<Card title="Cán bộ xuất sắc" bodyStyle={{ padding: '5px 10px' }}>
			<Row>
				<Col span={24}>
					<List
						itemLayout="horizontal"
						dataSource={data}
						renderItem={(item) => (
							<List.Item>
								<List.Item.Meta
									avatar={<Avatar icon={<UserOutlined />} />}
									title={item.ho_ten}
									description={
										<>
											Công việc đã hoàn thành: {item.cong_viec_hoan_thanh}/{item.tong_cong_viec}
											<Progress
												percent={item.ti_le ?? 0}
												showInfo={false}
												status={item.ti_le !== 100 ? 'active' : undefined}
												size="small"
											/>
										</>
									}
								/>
							</List.Item>
						)}
					/>
				</Col>
			</Row>
		</Card>
	);
};

export default CardCanBo;
