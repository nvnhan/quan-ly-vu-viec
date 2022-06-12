import { configureStore } from '@reduxjs/toolkit';
import myReducer from './reducers';

// declare global {
// 	interface Window {
// 		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
// 	}
// }
// // Enable to use Redux dev tool in development mode
// const composeEnhancers =
// 	'development' === process.env.NODE_ENV ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
// // Use redux-thunk as a redux middleware
// const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));
/**
 * Tạo 1 store cho cả APP
 * Dùng Provider để map toàn bộ APP
 */
// const store = createStore(myReducer, {}, enhancer);

export const store = configureStore({
	reducer: myReducer,
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch
