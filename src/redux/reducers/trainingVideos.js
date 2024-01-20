import { __DEV } from "../../isDev";

export function trainingVideos
(state = [], action) {
	switch (action.type) {
	case 'TRAINING_VIDEOS':
	  __DEV && console.log(action.data);
		return action.data;
	default:
		return state;
	}
}

