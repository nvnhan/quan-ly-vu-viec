import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import { store } from './store';
import ConfigProvider from 'antd/lib/config-provider';
import 'moment/locale/vi';
import locale from 'antd/lib/locale/vi_VN';

const App = () => {
	return (
		<BrowserRouter>
			<MainContainer />
		</BrowserRouter>
	);
};

export default App;

ReactDOM.render(
	<Provider store={store}>
		<ConfigProvider locale={locale}>
			<App />
		</ConfigProvider>
	</Provider>,
	document.getElementById('app')
);
