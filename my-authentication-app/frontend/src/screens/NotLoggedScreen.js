import React from 'react';

import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';

import {types, loginComponents} from '../common-logic/redux-store.js';

import Login from '../components/Login.js';

function mapDispatchToProps(dispatch) {
	return({
		setAppState: (p_new_active_component) => {dispatch({
			type: types.LOGINNAV,
			activeLoginComponent: p_new_active_component
		})},
	})
};

function mapStateToProps(state) {
	return({
		activeLoginComponent: state.activeLoginComponent,
	});
};

class NotLoggedScreen extends React.Component {

	render() {
		var l_active_component;
		switch (this.props.activeLoginComponent) {
			case (loginComponents.LOGIN):
				l_active_component = <Login />;
				break;
			default:
				// do nothing
		}
		return <div style={{display:'flex', justifyContent: 'center'}}>
			<Grid container spacing={16}>
				<Grid item xs={12}>
					{l_active_component}
				</Grid>
			</Grid>
		</div>;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NotLoggedScreen);
