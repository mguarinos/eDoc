import { createStore } from 'redux';

// Define action types
export const types = {
	JWT: 'JWT',
	HOMESCREENNAV: 'NAVIGATEHOMESCREENCOMPONENT',
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
	ACCOUNT: 'ACCOUNT'
};

export const loginComponents = {
	LOGIN: 'Login',
	SIGNUP1: 'SignUpEmailConfirmation',
	SIGNUP2: 'SignUpRelatedInputs',
};

export const settingsScreenComponents = {
	LOGOUT: 'Logout',
};

export const homeScreenComponents = {
	// Place here your components that you want to navigate in home screen
}

// Define a reducer
export const reducer = (p_state, p_action) => {
	let l_retval = Object.assign({}, p_state); // do not mutate p_state
	switch (p_action.type) {
		case types.JWT:
			l_retval['JWT'] = p_action.JWT;
			break;
		case types.ACCOUNT:
			l_retval['account'] = p_action.account;
			break;
		case types.LOGIN:
			l_retval['isLogged'] = true;
			break;
		case types.LOGOUT:
			l_retval['isLogged'] = false;
			break;
		default:
			// do nothing
	}
	return l_retval;
};

// Define the initial state of our store
export const initialState = {
	JWT: '',
	activeLoginComponent: loginComponents.LOGIN,
	isLogged: false,
	account: {}
};


// Create a store, passing our reducer function and our initial state
export const store = createStore(reducer, initialState);
