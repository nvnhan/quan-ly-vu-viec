import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import RouteContainer from './RouteContainer';
import RouteLoader from './RouteLoader';
import routes, { MyRoute } from './routes';

const MyContent = () => {
	const getRoute = (routes: MyRoute[]) =>
		routes.map((route, index) => <Route key={index} path={route.path} element={<RouteContainer {...route} />} />);

	return (
		<div className="content">
			<Suspense fallback={<RouteLoader />}>
				<Routes>{getRoute(routes)}</Routes>
			</Suspense>
		</div>
	);
};

export default React.memo(MyContent);
