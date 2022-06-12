import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import { store } from './store';

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
		<App />
	</Provider>,
	document.getElementById('app')
);
