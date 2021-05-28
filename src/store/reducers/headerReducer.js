import {userAvatar} from "./portsReducer";

const initialState = {
	// allNotifications: null,
	// allNotifications:
	newNotifications: null,
	miniAvatar: userAvatar,
}

export const ADD_TO_ALL_NOTIFICATIONS = "ADD_TO_ALL_NOTIFICATIONS";
export const ADD_NEW_NOTIFICATIONS = "ADD_NEW_NOTIFICATIONS";
export const ADD_NEW_PORT_NOTIFICATIONS = "ADD_NEW_PORT_NOTIFICATIONS";

export const headerReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_ALL_NOTIFICATIONS: {
			return {...state, allNotifications: action.payload};
		}

		case ADD_NEW_NOTIFICATIONS: {
			console.log(action.payload)

			return state;
		}

		default:
			return state;
	}
}