import Spin from 'antd/lib/spin/index';
import React from 'react';

interface ComponentProps {
	readonly tip?: string;
}

const RouteLoader = (props: ComponentProps) => {
	const s = props.tip || 'Đang tải dữ liệu ứng dụng...';
	return (
		<div className="loading-wrapper">
			<Spin tip={s} />
		</div>
	);
};

export default React.memo(RouteLoader);
