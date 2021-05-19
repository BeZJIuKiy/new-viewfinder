import React, { useState } from 'react';
import { Header } from './Header/Header';
import { Drawer } from './Drawer/Drawer';
import YaMap from './YaMap/YaMap';
import './ports.css';
import { NewMap } from './NewMap/NewMap';
import { setCurrentCamera } from '../../store/OldRedux/portsReduser';
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";


export const Ports = (props) => {
    const {selectedObjects, icons, header, data} = useSelector(state => state.ports);
    const {SelectedCameraAction} = useActions();

    // const [totalReactPackages, setTotalReactPackages] = useState(null);
    // const [errorMessage, setErrorMessage] = useState(null);

    // useEffect(() => {
    //     // GET request using fetch inside useEffect React hook
    //     // fetch('https://api.npms.io/v2/search?q=react')

    //     fetch('http://localhost:8000/api/ports')
    //         .then(async response => {
    //             const data = await response.json();

    //             // check for error response 
    //             if (!response.ok) {
    //                 const error = (data && data.message) || response.statusText;
    //                 return Promise.reject(error);
    //             }
    //             setTotalReactPackages(data.descrip);
    //         })
    //         .catch(error => {
    //             setErrorMessage(error.toString());
    //             console.error('There was an error!', error);
    //         });

    //     // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // }, []);



    // Блок для YaMap
    const [pleaceMapCoord, setPleaceMapCoord] = useState();
    const [mapCenter, setMapCenter] = useState();
    const [icon, setIcon] = useState();
    const [firstRenderPorts, setFirstRenderPorts] = useState(true);
    const [balCont, setBalCont] = useState(``);

    if (firstRenderPorts) {
        // setPleaceMapCoord(props.state.ports.data);
        // setMapCenter(props.state.ports.data[0]);
        // setIcon(props.state.ports.icons)
        // setBalCont(``);
        // setFirstRenderPorts(false);

        setPleaceMapCoord(data);
        setMapCenter([0]);
        setIcon(icons)
        setBalCont(``);
        setFirstRenderPorts(false);
    }



    // const requestBody = {
    //     method: 'GET',
    //     header: 'header',
    // }

    // fetch('http://localhost:8000/getData', requestBody)
    // .then(r => r.json())
    // .then(d => setPleaceMapCoord(d))
    // .catch();

    const showCameras = (i) => {
        // setPleaceMapCoord(props.state.ports.data[currentPort].cameras.data);
        // setMapCenter(props.state.ports.data[currentPort].cameras.data[0]);
        // setIcon(props.state.ports.data[currentPort].cameras.icons);

        setPleaceMapCoord(selectedObjects.port.cameras.data);
        setMapCenter(selectedObjects.port.cameras.data[0]);
        setIcon(selectedObjects.port.cameras.icons);
    }

    const changeBalConst = (data, num) => {
        setBalCont(`
            <div class="yamap__balloon__content">
                <iframe width="400" height="300"
                    src=${data.link}?controls=0&autoplay=1"
                    frameBorder="0" allow="accelerometer; 
                    clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                </iframe>

                <div class="yamap__balloon__text">
                    <div>Camera name: ${data.name}</div>
                    <div>Description: ${data.description}</div>
                    <div>Model: ${data.type}</div>
                    <div>Coordinates: ${data.coordinates[0]} ${data.coordinates[1]}</div>
                </div>
                <div class="yamap__balloon__link">
                    <a class="yamap__balloon__link__item"
                        href=${SelectedCameraAction(num), '/events'}
                        
            }}>
                        Move to ${data.name}
                    </a>
                </div>
            </div>
        `);
    }

    // href=${props.dispatch(setCurrentCamera(num)), '/events'}  см выше

    const [mapVisible, setmapVisible] = useState(true);
    const [addtype] = useState(["Yamap", "NewMap"]);

    const handleAddrTypeChange = (e) => setmapVisible(!mapVisible);

    return (
        <div>
            <Header
                firstRenderPorts={setFirstRenderPorts}
                state={props.headerData}
                notification={0}
            />
            <div className="searcher">
                <Drawer
                    state={pleaceMapCoord}
                    icons={icon}
                    showCameras={showCameras}
                    notification={props.events}
                    dispatch={props.dispatch}
                />

                <YaMap
                    isVisible={mapVisible}
                    center={mapCenter}
                    plMark={pleaceMapCoord}
                    icons={icon}
                    showCameras={showCameras}

                    balCont={balCont}
                    changeBalConst={changeBalConst}

                    dispatch={props.dispatch}
                />

                <NewMap isVisible={!mapVisible} />
            </div>

            <div className='home__map__changer'>
                <select
                    onChange={handleAddrTypeChange}
                    className="browser-default custom-select" >{
                        addtype.map((address, key) => <option value={key} key={key}>{address}</option>)
                    }
                </select >
            </div>
        </div>
    )
}