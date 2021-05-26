import {userAvatar} from "./portsReducer";

const initialState = {
	allNotifications: 0,
	newNotifications: 0,
	miniAvatar: userAvatar,
}

export const ADD_TO_ALL_NOTIFICATIONS = "ADD_TO_ALL_NOTIFICATIONS";

export const headerReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_ALL_NOTIFICATIONS: {
			const state = state;
			state.allNotifications += 1;
			state.newNotifications += 1;
			return {state};
		}

		default: return state;
	}
}