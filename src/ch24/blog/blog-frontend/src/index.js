import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import {composeWithDevTools} from "redux-devtools-extension";
import App from './App';
import './index.css';
import rootReducer, {rootSaga} from "./modules";
import reportWebVitals from './reportWebVitals';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware)),
	);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
		<App/>
	</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
reportWebVitals();
