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
import {tempSetUser, check} from "./modules/user";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware)),
	);

function loadUser() {
	try{
		const user = localStorage.getItem("user");
		if(!user) return;
		store.dispatch(tempSetUser(user));
		store.dispatch(check());
	} catch (err) {
		console.log("localStorage is not working");
	}
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
		<App/>
	</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
reportWebVitals();
