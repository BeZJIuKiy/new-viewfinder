import React, {useEffect, useState} from 'react';
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import './yaMap.css';
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";

const YaMap = (props) => {
	const {data, portIcon, cameraIcon, selectedObjects} = useSelector(state => state.ports)
	const {SelectedPortAction, SelectedCameraAction} = useActions();

	const [allData, setAllData] = useState(data);
	const [balContent, setBalContent] = useState('');
	const [mapCenter, setMapCenter] = useState();

	useEffect(() => {
		if (selectedObjects.port?.id >= 0) {
			setAllData(selectedObjects.port.cameras.data);

			setMapCenter({
				center: selectedObjects.port.coordinates,
				zoom: selectedObjects.port.cameras.data[0].zoom
			});
		} else {
			setAllData(data);
			const {coordinates} = data[0].cameras.data[0];

			setMapCenter({
				center: coordinates,
				zoom: data[0].zoom,
			});
			setBalContent('');
		}
	}, [selectedObjects.port]);

	const clickOnCamera = (data, i) => {
		SelectedCameraAction(i);

		const {name, description, type, coordinates, link} = data;
		setBalContent(`
		    <div class="yamap__balloon__content">
		        <iframe width="400" height="300"
		            src=${link}?controls=0&autoplay=1&mute=1"
		            frameBorder="0" allow="accelerometer;
		            clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
		        </iframe>

		        <div class="yamap__balloon__text">
		            <div>Camera name: ${name}</div>
		            <div>Description: ${description}</div>
		            <div>Model: ${type}</div>
		            <div>Coordinates: ${coordinates[0]} ${coordinates[1]}</div>
		        </div>
		        <div class="yamap__balloon__link">
		            <a class="yamap__balloon__link__item"		                
		                href='/events'}>
		                Move to ${name}
		            </a>
		        </div>
		    </div>
		`);

		// href=${SelectedCameraAction(i), '/events'}>  см. выше
	}

	const porstCoord = allData.map((c, i) => {
		return (
			<Placemark
				onClick={() => (!c.link) ? SelectedPortAction(i) : clickOnCamera(c, i) }
				key={c.description}
				geometry={c.coordinates}
				properties={{
					hintContent: `${c.description} cameras`,
					balloonContent: balContent,
				}}
				options={{
					preset: !c.link ? portIcon.map : cameraIcon.map,
					iconColor: '#ffba00'
				}}
				modules={
					['geoObject.addon.balloon', 'geoObject.addon.hint']
				}
			/>
		)
	});

	return (
		<div className={`yamap ${props.isVisible ? 'show' : 'hide'}`} style={{...props.style}}>
			<YMaps query={{lang: "en_US"}}>
				<Map className='yamap__item'
					state={mapCenter}
				>
					{porstCoord}
				</Map>

			</YMaps>
		</div>
	)
}

export default YaMap;