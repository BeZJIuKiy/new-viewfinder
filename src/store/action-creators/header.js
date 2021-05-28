import {ADD_NEW_NOTIFICATIONS, ADD_TO_ALL_NOTIFICATIONS, ADD_NEW_PORT_NOTIFICATIONS} from "../reducers/headerReducer";

export const AddAllNotificationAction = (number = 1) => ({type: ADD_TO_ALL_NOTIFICATIONS, payload: number});
export const AddNewNotificationAction = (number = 1) => ({type: ADD_NEW_NOTIFICATIONS, payload: number});

