// Icons
import mIcon_ports from '../../components/Ports/Drawer/images/harborIcon02.png';
import mIcon_cameras from '../../components/Ports/Drawer/images/camIcon.png';

// Boath
import boat1_01 from '../../components/Ports/Events/images/b1-01.jpg'
import boat1_03 from '../../components/Ports/Events/images/b1-03.jpg'
import boat1_04 from '../../components/Ports/Events/images/b1-04.jpg'

export const userAvatar = 'https://diletant.media/upload/medialibrary/75f/75fc56318cbdcf69f479b48892351a73.jpg';

const counter = {
	portsId: 0,
	camerasId: 0,
	eventsId: 0,
}

const initialState = {
	icons: {
		mapIcon: 'islands#blueWaterwayIcon',
		draverIcon: mIcon_ports,
	},

	selectedObjects: {
		port: {},
		camera: {},
	},

	header: {
		messages: 0,
		miniAvatar: userAvatar,
	},

	data: [
		{
			id: counter.portsId++,
			country: 'Russia',
			city: 'Saint Petersburg',
			description: 'Saint Petersburg',
			coordinates: [59.977915, 30.240934],
			// zoom: 3.3,
			zoom: 5,
			link: '',

			cameras: {
				icons: {
					mapIcon: 'islands#blueVideoIcon',
					draverIcon: mIcon_cameras,
				},

				data: [
					{
						id: counter.camerasId++,
						country: 'Russia',
						city: 'Saint Petersburg',
						name: 'Camera 1',
						type: 'Hikvision',
						move: 'STATIC',
						viewingAngle: '130',
						description: 'Club Parking STATIC',
						coordinates: [59.977915, 30.240934],
						zoom: 15,
						link: 'https://rtsp.me/embed/ayAby5ia',

						events: [
							{
								id: counter.eventsId++,
								typeError: 'Regular',
								typeVessel: 'Boat 1',
								location: 'Russia',
								city: 'Saint Petersburg',
								camera: 'Camera 1',
								date: '2020-12-21',
								time: '10:20:08',
								timezone: '+0300',
								imageLink: boat1_03,
								disctiption: 'Nothing interesting, keep moving on',
							},

							{
								id: counter.eventsId++,
								typeError: 'Regular',
								typeVessel: 'Boat 2',
								location: 'Russia',
								city: 'Saint Petersburg',
								camera: 'Camera 1',
								date: '2020-12-21',
								time: '10:22:31',
								timezone: '+0300',
								imageLink: boat1_01,
								disctiption: 'Nothing interesting, keep moving on',
							},
						],
					},

					{
						id: counter.camerasId++,
						country: 'Russia',
						city: 'Saint Petersburg',
						name: 'Camera 2',
						type: 'Hikvision',
						move: 'PTZ',
						viewingAngle: '80',
						description: 'Club Parking PTZ',
						coordinates: [59.977913, 30.240952],
						zoom: 15,
						link: 'https://rtsp.me/embed/KHyZd4ky/',

						events: [
							{
								id: counter.eventsId++,
								typeError: 'Regular',
								typeVessel: 'Boat 2',
								location: 'Russia',
								city: 'Saint Petersburg',
								camera: 'Camera 2',
								date: '2020-12-21',
								time: '10:22:31',
								timezone: '+0300',
								imageLink: boat1_04,
								disctiption: 'Nothing interesting, keep moving on',
							},
						],
					},
				],
			},
		},
	],
}

// Actions
export const SET_SELECTED_PORT = 'SET_SELECTED_PORT';
export const SET_SELECTED_CAMERA = 'SET_CURRENT_CAMERA';

// Reducer
export const portsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SELECTED_PORT: {
			const selectedObjects = state.selectedObjects;
			const i = action.payload;
			selectedObjects.port = state.data[i];
			return {...state, selectedObjects};
		}

		case SET_SELECTED_CAMERA: {
			const selectedObjects = state.selectedObjects;
			const {port} = selectedObjects;
			const i = action.payload;

			selectedObjects.camera = port.cameras[i];
			return {...state, selectedObjects}
		}
		default:
			return state;
	}
}