import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { setCurrentPort } from '../../../store/OldRedux/portsReduser';
import './yaMap.css';

const YaMap = (props) => {
    const mapCenter = props.center
        ? { center: props.center.coordinates, zoom: props.center.zoom }
        : { center: [59.349515, 18.121666], zoom: 3.3 };

    const [data, setData] = useState(props.plMark);

    useEffect(() => {
        setData(props.plMark);
    }, [props.plMark])

    const porstCoord = data.map((c, i) => {
        return (
            <Placemark
                onClick={() => {
                    if (c.link === '') { 
                        props.showCameras(i);
                        props.dispatch(setCurrentPort(i));
                    }
                    else {
                        props.changeBalConst(c, i);
                    }
                }}
                key={c.description}
                geometry={c.coordinates}
                properties={{
                    hintContent: `${c.description} cameras`,
                    balloonContent: props.balCont,
                }}
                options={{
                    preset: props.icons.mapIcon,
                    iconColor: '#ffba00'
                }}
                modules={
                    ['geoObject.addon.balloon', 'geoObject.addon.hint']
                }
            />
        )
    });

    return (
        <div className={`yamap ${props.isVisible ? 'show' : 'hide'}`} style={{ ...props.style }}>
            <YMaps query={{ lang: "en_US" }}>

                <Map
                    className='yamap__item'
                    state={mapCenter}
                >
                    {porstCoord}
                </Map>

            </YMaps>
        </div>
    )
}

export default YaMap;