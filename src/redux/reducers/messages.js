import { __DEV } from "../../isDev";

export function messages   // user's messages in an array 
(state = [], action) {
	switch (action.type) {
	case 'USER_MESSAGES':
	  __DEV && console.log(action.data,'USRMSGS7');
		return action.data;
	default:
		return state;
	}
}
