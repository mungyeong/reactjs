import React from 'react';
import ReactDOM from 'react-dom';
import {HelmetProvider} from "react-helmet-async"
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import App from './App';
import './index.css';
import rootReducer, {rootSaga} from "./modules";
import {check, tempSetUser} from "./modules/user";
import reportWebVitals from './reportWebVitals';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
	try {
		const user = localStorage.getItem("user");
		if (!user) return;
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
			<HelmetProvider>
				<App/>
			</HelmetProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
reportWebVitals();
