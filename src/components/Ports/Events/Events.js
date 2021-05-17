import React, { useState, useEffect } from 'react';
import { TestList } from './TestList';
import { TestImage } from './TestImage';
import { BoatEvents } from './BoatEvents';
import { Header } from '../Header/Header';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import { setCurrentCamera, setCurrentPort } from '../../../redux/portsReduser';
import './events.css'


export const Events = (props) => {
    // Get Data Block
    const [events, setEvents] = useState({
        curPort: props.currentPortData.port,
        curCamera: props.currentPortData.camera,
    });


    if (typeof events.curPort.id === 'undefined') props.dispatch(setCurrentPort(0));
    if (typeof events.curCamera.id === 'undefined') props.dispatch(setCurrentCamera(0));

    const [isImageShow, setIsImageShow] = useState(false);
    const [currentBoat, setCurrentBoat] = useState('');
    const [otherCameras, setOtherCameras] = useState();
    const [selectedEvent, setSelectedEvent] = useState(events.curCamera);
    const [selectedImage, setSelectedImage] = useState(-1);

    const clickOnImage = (visible) => { setIsImageShow(visible) };

    const changeBoat = (newBoat) => {
        setSelectedImage(-1);
        setIsImageShow(false);
        setCurrentBoat(newBoat);
    }

    const showSelectedImg = (i) => {
        if (currentBoat) {
            const curEvent = events.curCamera.events.filter(e => e.typeVessel === currentBoat);
            setSelectedImage(curEvent[i].id);
            return setSelectedEvent(curEvent[i])
        } else {
            setSelectedImage(events.curCamera.events[i].id);
            return setSelectedEvent(events.curCamera.events[i]);
        }
    }

    const changeSelectedImg = (num) => {
        const id = selectedEvent.id;

        if (currentBoat) {
            const cameraEvent = events.curCamera.events.filter(e => e.typeVessel === currentBoat);
            cameraEvent.forEach((element, i) => {
                if (id === element.id) {
                    if (i + num < 0 || i + num === cameraEvent.length) return setSelectedEvent(cameraEvent[i]), setSelectedImage(cameraEvent[i].id);
                    return setSelectedEvent(cameraEvent[i + num]), setSelectedImage(cameraEvent[i + num].id);
                }
            });
        } else {
            const cameraEvent = events.curCamera.events;
            cameraEvent.forEach((element, i) => {
                if (id === element.id) {
                    if (i + num < 0 || i + num === cameraEvent.length) return setSelectedEvent(cameraEvent[i]), setSelectedImage(cameraEvent[i].id);
                    return setSelectedEvent(cameraEvent[i + num]), setSelectedImage(cameraEvent[i + num].id);
                }
            });
        }
    }

    useEffect(() => {
        setOtherCameras(events.curPort.cameras.data.map((cam, i) => {
            if (cam.id !== events.curCamera.id) {
                return (
                    <div className='events__live__another__cameras__item' key={cam.id + 10}>
                        <div className="events__live__go__another__camera"
                            onClick={() => {
                                props.dispatch(setCurrentCamera(i));

                                setEvents({
                                    curPort: props.currentPortData.port,
                                    curCamera: props.currentPortData.camera,
                                });

                                setSelectedImage(-1);
                            }}
                        />

                        <div className={`events__live__another__cameras title`}>
                            {/* {`${cam.city}: ${cam.description}`} */}
                            {`${cam.description}`}

                            {/* <IconButton aria-label="show 4 new mails" color="inherit"> */}
                            <IconButton color="inherit" style={{ padding: '10px 0 0 5px' }}>
                                <Badge badgeContent={cam.events.length} color="secondary">
                                    <NotificationsIcon color="primary" />
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
    }, [events.curCamera.id]);

    return (
        <div className='events'>
            <div>
                <Header
                    state={props.stateHeader}
                    notification={props.notification}
                    firstRenderPorts={() => { }}
                />

                <div className='events__container'>
                    <div className='events__content'>
                        <div className='events__camera'>
                            <div className={`events__camera__item container`}>
                                <div className={`events__camera__item title`}>EVENTS</div>
                                <div className={`events__camera__item events__and__image`}>
                                    <div className='events__camera__item'>
                                        <TestList
                                            currentPortData={events.curCamera.events}
                                            changeBoat={changeBoat}
                                            dispatch={props.dispatch}
                                        />
                                    </div>
                                    <div className='events__camera__item'>
                                        <TestImage
                                            clickOnImage={clickOnImage}
                                            currentBoat={currentBoat}
                                            boatImage={events.curCamera.events}
                                            showSelectedImg={showSelectedImg}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={`events__live ${isImageShow ? 'hide' : 'show'}`}>
                                <div className='events__live__camera'>
                                    <div className={`events__live__camera title`}>
                                        {`${events.curCamera.city}: ${events.curCamera.description}`}
                                    </div>
                                    <div>
                                        <iframe width="676" height="380"
                                            src={events.curCamera.link}
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

                            <div className={`events__image ${isImageShow ? 'show' : 'hide'}`}>
                                <div className='events__image__boat'>
                                    <div className={`events__image__boat title`}>
                                        {selectedEvent.typeVessel}
                                    </div>
                                    <div className={`events__image__boat img`}>
                                        <div className={`events__image__boat close`}>
                                            <IconButton style={{ color: 'black' }} aria-label="add an alarm">
                                                <CloseIcon onClick={() => { clickOnImage(false) }} />
                                            </IconButton>
                                        </div>

                                        <IconButton style={{ color: '#333' }} aria-label="add an alarm">
                                            <ArrowForwardIosIcon
                                                className={`events__image__boat left__arrow`}
                                                fontSize="large"
                                                onClick={() => changeSelectedImg(-1)}
                                            />
                                        </IconButton>

                                        <img
                                            style={{ width: '676px', height: '380px' }}
                                            src={selectedEvent.imageLink} alt={selectedEvent.typeVessel}
                                        />

                                        <IconButton style={{ color: '#333' }} aria-label="add an alarm">
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
                        events={events.curCamera.events}
                        currentBoat={currentBoat}
                        curCamera={events.curCamera}
                        selectedImage={selectedImage}
                        closeImage={clickOnImage}
                        setSelectedImage={setSelectedImage}
                        showSelectedImg={showSelectedImg}
                    />
                </div>
            </div>
        </div>
    )
}