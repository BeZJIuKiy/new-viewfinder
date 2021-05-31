import {
	ADD_NEW_NOTIFICATIONS,
	ADD_TO_ALL_NOTIFICATIONS,
	ADD_NEW_PORTS_NOTIFICATIONS,
	ADD_ALL_NEW_NOTIFICATIONS,
	ADD_NEW_CAMERAS_NOTIFICATIONS
} from "../reducers/headerReducer";

export const AddAllNotificationAction = (number = 1) => ({type: ADD_TO_ALL_NOTIFICATIONS, payload: number});
export const AddNewNotificationAction = (portNum, portNote = 0, cameraNum, cameraNote = 0) => ({
	type: ADD_NEW_NOTIFICATIONS,
	payload: {portNum, portNote, cameraNum, cameraNote}
});
export const AddAllNewNotificationAction = (number = 1) => ({type: ADD_ALL_NEW_NOTIFICATIONS, payload: number});

export const AddNewPortsNotificationAction = (number = 1) => ({type: ADD_NEW_PORTS_NOTIFICATIONS, payload: number});
export const AddNewCamerasNotificationAction = (number = 1) => ({type: ADD_NEW_CAMERAS_NOTIFICATIONS, payload: number});

