import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Icon } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { NavLink, useHistory } from 'react-router-dom';
import { setCurrentCamera, setCurrentPort } from '../../../redux/portsReduser';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const eventNewPath = (data) => `/events?country=${data.country}&city=${data.city}&camId=${data.id}&num=${data.num}`;


export const SimpleList = (props) => {
    const classes = useStyles();
    let history = useHistory();

    const [data, setData] = useState(props.state);

    useEffect(() => {
        setData(props.state);
    }, [props.state]);

    const camData = data.map((d, i) => {
        let notific = 0;
        (d.link === '')
            ? d.cameras.data.map(e => notific += e.events.length)
            : notific += d.events.length;

        // debugger;
        return (
            <div key={d.id}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button
                        onClick={() => {
                            (d.link === '')
                                ? (<>{
                                    props.dispatch(setCurrentPort(i)),
                                    props.dispatch(setCurrentCamera(0)),
                                    props.showCameras(i)
                                }</>)
                                : (<>{
                                    props.dispatch(setCurrentCamera(i)),

                                    history.push('/events')
                                }</>)
                        }}
                    >
                        <ListItemIcon>
                            <Icon><img src={props.icons.draverIcon} height={25} width={25} alt="" /></Icon>
                        </ListItemIcon>
                        <ListItemText primary={d.description} />

                        <IconButton aria-label="show 17 new notifications" color="default">
                            <Badge badgeContent={notific} color="secondary">
                                <NavLink to={eventNewPath({
                                        country: d.country,
                                        city: d.city,
                                        id: d.id,
                                        num: 0,
                                    })}
                                >
                                    <NotificationsIcon />
                                </NavLink>
                            </Badge>
                        </IconButton>
                    </ListItem>
                </List>
                <Divider />
            </div>
        )
    });

    return (
        <div className={classes.root}>
            {camData}
        </div>
    );
}