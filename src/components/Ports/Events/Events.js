import React, {useState, useEffect} from 'react';
import {TestList} from './TestList';
import {TestImage} from './TestImage';
import {BoatEvents} from './BoatEvents';
import {Header} from '../Header/Header';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import './events.css'
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";


export const Events = () => {
	const {
		selectedObjects: {
			port, camera, event,
			shipImage: {isVisible: imageVisible, id: imageId},
		},
	} = useSelector(state => state.ports);

	const {camerasNewNote} = useSelector(state => state.header)

	const {
		SelectedPortAction,
		SelectedCameraAction,
		SelectedImageVisibleAction,
		SelectedShipImageIdAction
	} = useActions();

	if (typeof port.id === 'undefined') SelectedPortAction(0);
	if (typeof camera.id === 'undefined') SelectedCameraAction(0);

	const [currentBoat, setCurrentBoat] = useState('');
	const [otherCameras, setOtherCameras] = useState();
	const [selectedEvent, setSelectedEvent] = useState(camera);

	useEffect(() => {
		setCurrentBoat(event.typeVessel);
		SelectedImageVisibleAction(false);
		SelectedShipImageIdAction(-1);
	}, [event]);

	const findImageId = () => {
		for (let i = 0; i < camera.events.length; ++i) {
			if (camera.events[i].id === imageId) {
				return camera.events[i];
			}
		}
		return camera.events[0];
	}

	useEffect(() => {
		setSelectedEvent(findImageId())
	}, [imageId]);

	const changeSelectedImg = (num) => {
		const id = selectedEvent.id;
		const cameraEvent = currentBoat
			? camera.events.filter(e => e.typeVessel === currentBoat)
			: camera.events;

		cameraEvent.forEach((element, index) => {
			if (id === element.id) {
				const task = (index + num < 0 || index + num === cameraEvent.length);
				const imgNum = task ? index : index + num;

				setSelectedEvent(cameraEvent[imgNum]);
			}
		});
	}

	const otherCameraClick = (i) => {
		SelectedCameraAction(i);
	}

	const closeImage = () => {
		SelectedImageVisibleAction(false);
		SelectedShipImageIdAction(-1);
	}

	useEffect(() => {
		setOtherCameras(port.cameras.data.map(({id, description, events, link}, i) => {
			if (id !== camera.id) {
				return (
					<div className='events__live__another__cameras__item' key={id}>
						<div className="events__live__go__another__camera"
						     onClick={() => otherCameraClick(i)}
						/>

						<div className={`events__live__another__cameras title`}>
							{`${description}`}

							{/* <IconButton aria-label="show 4 new mails" color="inherit"> */}
							<IconButton color="inherit" style={{padding: '10px 0 0 5px'}}>
								{/*<Badge badgeContent={events.length} color="secondary">*/}
								<Badge badgeContent={camerasNewNote[i]} color="secondary">
									<NotificationsIcon color="primary"/>
								</Badge>
							</IconButton>
						</div>

						<iframe
							width="285" height="160"
							src={link}
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer;
                                   autoplay;
                                   clipboard-write;
                                   encrypted-media;
                                   gyroscope;
                                   picture-in-picture"
							allowFullScreen
						/>
					</div>
				)
			}
		}));
	}, [camera]);

	// const temp = camera.events.length;
	const text = () => {
		console.log("вызвал");

		return (
			<div>
				123
			</div>
		)
	}

	return (
		<div className='events'>
			<div>
				<Header/>

				<div className='events__container'>
					<div className='events__content'>
						<div className='events__camera'>
							<div className={`events__camera__item container`}>
								<div className={`events__camera__item title`}>EVENTS</div>
								<div className={`events__camera__item events__and__image`}>
									<div className='events__camera__item'>
										<TestList/>
									</div>
									<div className='events__camera__item'>
										<TestImage/>
									</div>
								</div>
							</div>

							<div className={`events__live ${imageVisible ? 'hide' : 'show'}`}>
								<div className='events__live__camera'>
									<div className={`events__live__camera title`}>
										{`${camera.city}: ${camera.description}`}
									</div>
									<div>
										<iframe width="676" height="380"
											// src={camera.link + '&autoplay="yes"'}
											    src={camera.link}
											    title="YouTube video player"
											    frameBorder="0"
											    allow="accelerometer;
                                                   autoplay;
                                                   clipboard-write;
                                                   encrypted-media;
                                                   gyroscope;
                                                   picture-in-picture"
											    allowFullScreen
										/>
									</div>
								</div>

								<div className='events__live__another__cameras'>
									{otherCameras}
								</div>
							</div>

							<div className={`events__image ${imageVisible ? 'show' : 'hide'}`}>
								<div className='events__image__boat'>
									<div className={`events__image__boat title`}>
										{text()}
										{/*{selectedEvent.typeVessel ? selectedEvent.typeVessel : ""}*/}
									</div>
									<div className={`events__image__boat img`}>
										<div className={`events__image__boat close`}>
											<IconButton
												style={{color: 'black'}} aria-label="add an alarm"
												onClick={closeImage}
											>
												<CloseIcon/>
											</IconButton>
										</div>

										<IconButton
											style={{color: '#333'}} aria-label="add an alarm"
											onClick={() => changeSelectedImg(-1)}
										>
											<ArrowForwardIosIcon
												className={`events__image__boat left__arrow`}
												fontSize="large"
											/>
										</IconButton>

										<img
											style={{width: '676px', height: '380px'}}
											src={selectedEvent.imageLink} alt={selectedEvent.typeVessel}
										/>

										<IconButton
											style={{color: '#333'}} aria-label="add an alarm"
											onClick={() => changeSelectedImg(+1)}
										>

											<ArrowForwardIosIcon fontSize="large"/>
										</IconButton>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={`events__container`}>
				<div className='events__footer'>
					<BoatEvents/>
				</div>
			</div>
		</div>
	)
}