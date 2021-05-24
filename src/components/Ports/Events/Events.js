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
		selectedObjects: {port, camera, event,
			shipImage: {index: imageIndex, isVisible: imageVisible},
		},
	} = useSelector(state => state.ports);

	// const state = useSelector(state => state.ports);
	// console.log(imageVisible)

	const {
		SelectedPortAction,
		SelectedCameraAction,
		SelectedImageVisibleAction,
		SelectedShipImageAction
	} = useActions();

	if (typeof port.id === 'undefined') SelectedPortAction(0);
	if (typeof camera.id === 'undefined') SelectedCameraAction(0);

	const [isImageShow, setIsImageShow] = useState(false);
	const [currentBoat, setCurrentBoat] = useState('');
	const [otherCameras, setOtherCameras] = useState();
	const [selectedEvent, setSelectedEvent] = useState(camera);
	const [selectedImage, setSelectedImage] = useState(-1);

	const clickOnImage = (visible) => setIsImageShow(visible);

	useEffect(() => {
		setSelectedImage(-1);
		setIsImageShow(false);
		setCurrentBoat(event.typeVessel);
		SelectedImageVisibleAction(false);
	}, [event]);

	useEffect(() => {

	}, [])
	const showSelectedImg = (i) => {
		const curEvent = currentBoat
			? camera.events.filter(e => e.typeVessel === currentBoat)
			: camera.events;

		setSelectedImage(curEvent[i].id);
		setSelectedEvent(curEvent[i]);
	}

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
				setSelectedImage(cameraEvent[imgNum].id);
			}
		});
	}

	const otherCameraClick = (i) => {
		SelectedCameraAction(i);
		setSelectedImage(-1);
	}

	useEffect(() => {
		setOtherCameras(port.cameras.data.map((cam, i) => {
			if (cam.id !== camera.id) {
				return (
					<div className='events__live__another__cameras__item' key={cam.id + 10}>
						<div className="events__live__go__another__camera"
						     onClick={() => otherCameraClick(i)}
						/>

						<div className={`events__live__another__cameras title`}>
							{`${cam.description}`}

							{/* <IconButton aria-label="show 4 new mails" color="inherit"> */}
							<IconButton color="inherit" style={{padding: '10px 0 0 5px'}}>
								<Badge badgeContent={cam.events.length} color="secondary">
									<NotificationsIcon color="primary"/>
								</Badge>
							</IconButton>
						</div>


						<iframe
							width="285" height="160"
							src={cam.link}
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
										<TestList />
									</div>
									<div className='events__camera__item'>
										<TestImage
											showSelectedImg={showSelectedImg}
										/>
									</div>
								</div>
							</div>

							{/*<div className={`events__live ${isImageShow ? 'hide' : 'show'}`}>*/}
							<div className={`events__live ${imageVisible ? 'hide' : 'show'}`}>
								<div className='events__live__camera'>
									<div className={`events__live__camera title`}>
										{`${camera.city}: ${camera.description}`}
									</div>
									<div>
										<iframe width="676" height="380"
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

							{/*<div className={`events__image ${isImageShow ? 'show' : 'hide'}`}>*/}
							<div className={`events__image ${imageVisible ? 'show' : 'hide'}`}>
								<div className='events__image__boat'>
									<div className={`events__image__boat title`}>
										{selectedEvent.typeVessel}
										{/*{event.typeVessel}*/}
									</div>
									<div className={`events__image__boat img`}>
										<div className={`events__image__boat close`}>
											<IconButton style={{color: 'black'}} aria-label="add an alarm">
												<CloseIcon onClick={() => SelectedImageVisibleAction(false)} />
													{/*() => clickOnImage(false)}*/}
												{/*/>*/}
											</IconButton>
										</div>

										<IconButton style={{color: '#333'}} aria-label="add an alarm">
											<ArrowForwardIosIcon
												className={`events__image__boat left__arrow`}
												fontSize="large"
												onClick={() => changeSelectedImg(-1)}
											/>
										</IconButton>

										<img
											style={{width: '676px', height: '380px'}}
											src={selectedEvent.imageLink} alt={selectedEvent.typeVessel}
											// src={event.imageLink} alt={event.typeVessel}
										/>

										<IconButton style={{color: '#333'}} aria-label="add an alarm">
											<ArrowForwardIosIcon
												fontSize="large"
												onClick={() => changeSelectedImg(+1)}
											/>
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
					<BoatEvents
						selectedImage={selectedImage}
						setSelectedImage={setSelectedImage}
						// closeImage={clickOnImage}
						showSelectedImg={showSelectedImg}
					/>
				</div>
			</div>
		</div>
	)
}