import {userAvatar} from "./portsReducer";

const initialState = {
	// allNotifications: null,
	allNotifications: null,
	allNote: [
		{
			portNote: 0,
			cameraNote: [],
		},
	],
	portsNewNote: [],
	camerasNewNote: [],
	allNewNotifications: 0,
	miniAvatar: userAvatar,
}

export const ADD_TO_ALL_NOTIFICATIONS = "ADD_TO_ALL_NOTIFICATIONS";
// export const ADD_NEW_NOTIFICATIONS = "ADD_NEW_NOTIFICATIONS";
export const ADD_ALL_NEW_NOTIFICATIONS = "ADD_NEW_NOTIFICATIONS";
export const ADD_NEW_PORTS_NOTIFICATIONS = "ADD_NEW_PORTS_NOTIFICATIONS";
export const ADD_NEW_CAMERAS_NOTIFICATIONS = "ADD_NEW_CAMERAS_NOTIFICATIONS";


export const ADD_NEW_NOTIFICATIONS = "ADD_NEW_NOTIFICATIONS";

export const headerReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_ALL_NOTIFICATIONS: {
			return {...state, allNotifications: action.payload};
		}

		case ADD_NEW_NOTIFICATIONS: {
			console.log("ADD_NEW_NOTIFICATIONS")
			console.log(action.payload)
			const {allNote} = state;
			const {portNum, portNote, cameraNum, cameraNote} = action.payload;
			allNote[portNum].portNote = portNote;
			allNote[portNum].cameraNote[cameraNum] = cameraNote;

			console.log(allNote);

			return state;
			// return {...state, newNotifications: action.payload}
		}

		case ADD_NEW_PORTS_NOTIFICATIONS: {

			const {portsNewNote} = state
			portsNewNote.push(action.payload);
			console.log(portsNewNote);
			return {...state, portsNewNote};
		}

		case ADD_NEW_CAMERAS_NOTIFICATIONS: {
			const {camerasNewNote} = state;
			camerasNewNote.push(action.payload);
			console.log(camerasNewNote);
			return {...state, camerasNewNote};
		}

		default:
			return state;
	}
}