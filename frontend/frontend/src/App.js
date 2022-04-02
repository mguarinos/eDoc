import React from 'react';
import { Provider } from 'react-redux';
import {store} from './common-logic/redux-store.js';
import AppSub from './AppSub.js';


export default class App extends React.Component {
	render() {
		return <Provider store={store}>
			<AppSub />
		</Provider>;
	}
}
