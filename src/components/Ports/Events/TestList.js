import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        width: 250,
        maxWidth: 360,
        maxHeight: 400,
        backgroundColor: theme.palette.background.paper,
        overflowY: 'auto',
    },
}));

export const TestList = (props) => {
    const classes = useStyles();

    let allTypeVessel = props.currentPortData.map((b, i) => (
        b.typeVessel
    ));

    allTypeVessel = allTypeVessel.filter((item, pos) => (
        allTypeVessel.indexOf(item) === pos
    ));


    const boat = allTypeVessel.map((type, i) => {
        return (
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button onClick={() => {
                        props.changeBoat(type)
                    }}>
                        <ListItemText primary={type} align="center" />
                    </ListItem>
                </List>
                <Divider />
            </div>
        )
    });

    // <ListItemIcon>
    //     <Icon><img src={props.icons.draverIcon} height={25} width={25} /></Icon>
    // </ListItemIcon>

    return (
        <div>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button onClick={() => {
                    props.changeBoat('');
                }}>
                    <ListItemText primary={`All Events ${props.currentPortData[0].camera}`} align="center" />
                </ListItem>
            </List>
            <Divider />

            { boat}
        </div>
    );
}