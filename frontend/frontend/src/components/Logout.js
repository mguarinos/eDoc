import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from "js-cookie";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {types, settingsScreenComponents, loginComponents} from '../common-logic/redux-store.js';
import config from '../common-logic/config.js';
import { fetch_data_v2 } from '../common-logic/fetchhandler.js';


function mapDispatchToProps(dispatch) {
	return({
		setJWT: (l_JWT) => {
			dispatch({
				type: types.JWT,
				JWT: l_JWT
			})
		},
		setAppState: (p_new_active_component) => {dispatch({
			type: types.SETTINGSSCREENNAV,
			activeSettingsScreenComponent: p_new_active_component
		})},
		setLoginState: (l_logIn) => {
			let l_type = l_logIn ?  types.LOGIN : types.LOGOUT;
			dispatch({type: l_type})},
	})
};

function mapStateToProps(state) {
	return({
		activeLoginComponent: state.activeLoginComponent,
		JWT: state.JWT,
	});
};

class Logout extends React.Component {

	constructor() {
		super();
		this.componentMainFunction = this.componentMainFunction.bind(this);
	}

	componentDidMount(){
	}
	componentMainFunction(){
		localStorage.removeItem(config.JWTKey);
		let l_method = "POST";
		let l_uri = "http://back.guarinos.xyz:4000/accounts/logout";
		let l_extra_headers = {
			'Authorization': 'Bearer ' + this.props.JWT,
		};
		let l_body = {
		};
		let l_fnc = ((p_resp) => {
			if (p_resp.jwtToken) {
				this.props.setJWT(p_resp.jwtToken);
				this.props.setLoginState(true);
				if (this.state.remember_me) localStorage.setItem(config.JWTKey, p_resp.JWT);
			}
		}).bind(this); 
		fetch_data_v2(l_method, l_uri, l_extra_headers, l_body, l_fnc);
		this.props.setJWT('');
		this.props.setLoginState(false);
		this.props.setAppState(loginComponents.LOGIN);
	}

	render() {
		const { classes } = this.props;
		return <Grid container spacing={16}>
			<Grid item xs={12}></Grid>
			<Grid item xs={12}></Grid>
			<Grid item xs={12}>{config.uiTexts.Logout.logout}</Grid>
			<Grid item xs={12}></Grid>
			<Grid item xs={12}></Grid>
			<Grid item xs={12}>
				<Button variant="contained"
						color="secondary"
						className={classes.button}
						onClick={this.componentMainFunction}
				>
					{config.uiTexts.Common.yes}
				</Button>
			</Grid>
			<Grid item xs={12}></Grid>
			<Grid item xs={12}></Grid>
			<Grid item xs={12}>
				<MuiThemeProvider theme={greenTheme}>
					<Button variant="contained"
						color="secondary"
						className={classes.button}
						onClick={() => this.props.setAppState(settingsScreenComponents.SETTINGS)}
					>
						{config.uiTexts.Common.no}
					</Button>
				</MuiThemeProvider>
			</Grid>
		</Grid>;
	}

}

const greenTheme = createMuiTheme({
	palette: { primary: green },
	typography: {useNextVariants: true,},
})

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
	 },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Logout));
