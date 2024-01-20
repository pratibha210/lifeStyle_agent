import { __DEV } from "../../isDev";

export function userDetail
	(state = {}, action)
{
	switch (action.type) {
		case 'LOGGED_USER_DETAILS':
			__DEV && console.log(action.data);
			let userDetails = { ...action.data };
			if (Object.keys(userDetails).length > 0) {
				let array = userDetails.userChatRoom.pageDataRespObj.resp;
				console.log(array);
				let obj = Object.create(null);
				obj.nTrainings = array[0];
				obj.nStoreItems = array[1];
				obj.nFaqs = array[2];
				obj.nMarketing = array[3];
				obj.nReferences = array[4];
				if (userDetails.role === 'admin') {
					obj.nUsers = array[5];
					obj.nManagers = array[6];
				}

				userDetails = { ...userDetails, obj }
			}
			return userDetails;
		default:
			return state;
	}
}

