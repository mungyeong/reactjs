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
import {loadableReady} from "@loadable/component";

const sagMiddleware = createSagaMiddleware();


const store = createStore(
	rootReducer,
	window.__PRELOADED_STATE__,
	applyMiddleware(thunk,sagMiddleware));

sagMiddleware.run(rootSaga);

const Root = () => {
	return (
		<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>)
}

const root = document.getElementById("root");

if (process.env.NODE_ENV === "production") {
	loadableReady(() => {
		ReactDOM.hydrate(<Root/>, root);
	});
} else {
	ReactDOM.render(<Root/>, root);
}


reportWebVitals();
