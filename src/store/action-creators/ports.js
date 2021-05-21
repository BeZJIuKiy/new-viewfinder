import {
	CLEAR_SELECTED_EVENT,
	CLEAR_SELECTED_OBJECTS,
	SET_SELECTED_CAMERA, SET_SELECTED_EVENT,
	SET_SELECTED_PORT
} from "../reducers/portsReducer";


export const SelectedPortAction = (number) => ({type: SET_SELECTED_PORT, payload: number});
export const SelectedCameraAction = (number) => ({type: SET_SELECTED_CAMERA, payload: number});
export const ClearSelectedAction = () => ({
	type: CLEAR_SELECTED_OBJECTS,
	payload: {
		port: {},
		camera: {},
	}
});

export const SelectedEventAction = (number) => ({type: SET_SELECTED_EVENT, payload: number});
export const ClearSelectedEventAction = () => ({
	type: CLEAR_SELECTED_EVENT,
	payload: {
		event: {},
	}
});