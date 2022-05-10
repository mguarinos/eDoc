import React, { Component } from 'react';
import VistaPrincipal from './screens/VistaPrincipal.js'
import CustomSpinner from './components/CustomSpinner.js';
import NotLoggedScreen from './screens/NotLoggedScreen.js';
import { connect } from 'react-redux';
import {types} from './common-logic/redux-store.js';

function mapDispatchToProps(dispatch) {
	return({
		setJWT: (l_JWT) => {
			dispatch({
				type: types.JWT,
				JWT: l_JWT
			})
		},
		setAccount: (account) => {
			dispatch({
				type: types.ACCOUNT,
				account: account
			})
		},
		setLoginState: (l_logIn) => {
					let l_type = l_logIn ?  types.LOGIN : types.LOGOUT;
					dispatch({type: l_type})},
	})
};

function mapStateToProps(state) {
	return({
			  isLogged: state.isLogged,
				JWT: state.JWT
	});
};

class AppSub extends Component {

	constructor(props){
		super(props);
		this.state = {
			JWTState: "checking",
			JWTtoken: ""
		};
	};

	render() {
		if (this.state.JWTState === "ckecking")
			return <CustomSpinner />;
		let l_login_page = <NotLoggedScreen />;
		let l_homescreen = <VistaPrincipal />;
		let l_mainpage =
			this.props.JWT
			 ? l_homescreen : l_login_page;
		return (l_mainpage);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppSub);
