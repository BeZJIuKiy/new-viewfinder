import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {Icon} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import {NavLink, useHistory} from 'react-router-dom';
import {setCurrentCamera, setCurrentPort} from '../../../store/OldRedux/portsReduser';
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";
import {AddAllNotificationAction} from "../../../store/action-creators/header";

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

export const SimpleList = () => {
	const {data, portIcon, cameraIcon, selectedObjects} = useSelector(state => state.ports);
	const {allNotifications} = useSelector(state => state.header);
	const {SelectedPortAction, SelectedCameraAction, AddNewNotificationAction, AddAllNotificationAction} = useActions();

	const [allData, setAllData] = useState(data)
	const [portsNote, setPortsNote] = useState({
		ports: null,
		cameras: null,
	});

	const classes = useStyles();
	const history = useHistory();

	const changeDataPorts = (i) => {
		SelectedPortAction(i);
		SelectedCameraAction(0);
	}
	const changeDataCamera = (i) => {
		SelectedCameraAction(i);
		history.push('/events');
	}

	useEffect(() => {
		if (selectedObjects.port?.id >= 0) {
			setAllData(selectedObjects.port.cameras.data);
		} else {
			setAllData(data);

			let allNote = 0;

			allData.map((port, portIndex) => {
				port.cameras.data.map(camera => {
					allNote += camera.events.length;
					AddNewNotificationAction(portIndex, camera.events.length);
				})
			})

			AddAllNotificationAction(allNote);
		}
	}, [selectedObjects.port]);

	// useEffect(() => {
	//
	// }, [allNotifications])

	const camData = allData.map((d, i) => {
		const notific = 0;
		return (
			<div key={d.id}>
				<List component="nav" aria-label="main mailbox folders">
					<ListItem button
					          onClick={() => !d.link ? changeDataPorts(i) : changeDataCamera(i)}
					>
						<ListItemIcon>
							<Icon><img src={!d.link ? portIcon.drawer : cameraIcon.drawer} height={25} width={25}
							           alt=""/></Icon>
						</ListItemIcon>
						<ListItemText primary={d.description}/>

						<IconButton aria-label="show 17 new notifications" color="default">
							<Badge badgeContent={notific} color="secondary">
							{/*<Badge badgeContent={allNotifications} color="secondary">*/}
								<NavLink to="/events">
									<NotificationsIcon/>
								</NavLink>
							</Badge>
						</IconButton>
					</ListItem>
				</List>
				<Divider/>
			</div>
		)
	});

	return (
		<div className={classes.root}>
			{camData}
		</div>
	);
}