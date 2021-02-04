import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import App from './App';
import rootReducer,{rootSaga} from "./modules";
import reportWebVitals from './reportWebVitals';
import createSagaMiddleware from "redux-saga";

const sagMiddleware = createSagaMiddleware();


const store = createStore(
	rootReducer,
	window.__PRELOADED_STATE__,
	applyMiddleware(thunk,sagMiddleware));

sagMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

reportWebVitals();
