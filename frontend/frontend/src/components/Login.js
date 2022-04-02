import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { types,} from '../common-logic/redux-store.js';
import config from '../common-logic/config.js';
import { fetch_data_v2 } from '../common-logic/fetchhandler.js';
import {nvl} from '../common-logic/generic_library.js';

function mapDispatchToProps(dispatch) {
	return ({
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
		setAppState: (p_new_active_component) => {
			dispatch({
				type: types.LOGINNAV,
				activeLoginComponent: p_new_active_component
			})
		},
		setLoginState: (l_logIn) => {
			let l_type = l_logIn ? types.LOGIN : types.LOGOUT;
			dispatch({ type: l_type })
		},
	})
};

function mapStateToProps(state) {
	return ({
		activeLoginComponent: state.activeLoginComponent,
		account: state.account
	});
};

class Login extends React.Component {

	constructor() {
		super();
		this.componentMainFunction = this.componentMainFunction.bind(this);
		this.state = {
			remember_me: false,
		};
	}

	componentDidMount() {
	}


	componentMainFunction() {
		let l_method = "POST";
		let l_uri = config.mainServerBaseURL + "/users/authenticate";
		let l_extra_headers = {};
		let l_body = {
			username: this.state.email_value,
			password: this.state.password_value,
		};
		let l_fnc = ((p_resp) => {
			if (p_resp.token) {
				if (this.state.remember_me)
					localStorage.setItem(config.JWTKey, p_resp.token);
				this.props.setJWT(p_resp.token);

				//Tenemos el token, obtenemos la cuenta
				let l_method2 = "GET";
				let l_uri2 = config.mainServerBaseURL + "/users/getuser";
				let l_extra_headers2 = {'Authorization': 'Bearer ' + nvl(p_resp.token, "xx")};
				let l_body2 = {};
				let l_fnc2 = ((p_resp2) => {
					if (p_resp2) {
						this.props.setAccount(p_resp2);
						this.props.setLoginState(true);
					}
				})
				fetch_data_v2(l_method2, l_uri2, l_extra_headers2, l_body2, l_fnc2);
			}

			 else alert('Credenciales incorrectos');
		})
		fetch_data_v2(l_method, l_uri, l_extra_headers, l_body, l_fnc);
	}

	render(){
		return (
		<div>
			<div className="body" />
			<div className="grad" />
			<div className="edoc_title">
				<div>e<span>DOC</span></div>
			</div>
			<br />
			<div className="login">
					<input type="text"
						placeholder="username"
						name="user"
						value={this.state.email_value}
						onChange={(event) => { this.setState({ email_value: event.target.value }) }}

					/><br />
					<input type="password"
						value={this.state.password_value}
						onChange={(event) => { this.setState({ password_value: event.target.value }) }}
						placeholder="password" name="password" /><br />
					<input type="button"
						onClick={this.componentMainFunction}
						defaultValue="Login" /> <br/>
			</div>
		</div>
		);
	}


}



const styles = theme => ({
container: {
	display: 'flex',
	flexWrap: 'wrap',
},
textField: {
	marginLeft: theme.spacing.unit,
	marginRight: theme.spacing.unit,
},
dense: {
	marginTop: 16,
},
menu: {
	width: 200,
},
button: {
	margin: theme.spacing.unit,
	display: "block",
	width: "100%"
},
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
