import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createLogger} from "redux-logger/src";
import createSagaMiddleware from "redux-saga";
import ReduxThunk from "redux-thunk";
import App from './App';
import rootReducer, {rootSaga} from "./modules";
import reportWebVitals from './reportWebVitals';

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, ReduxThunk, sagaMiddleware)));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);

reportWebVitals();
