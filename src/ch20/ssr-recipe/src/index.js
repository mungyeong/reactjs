import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import App from './App';
import rootReducer from "./modules";
import reportWebVitals from './reportWebVitals';

const store = createStore(
	rootReducer,
	window.__PRELOADED_STATE__,
	applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>
	,
	document.getElementById('root')
);

reportWebVitals();
