import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {useActions} from "../../../hooks/useActions";
import {useSelector} from "react-redux";


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

export const TestList = () => {
	const classes = useStyles();
	const {SelectedEventAction, ClearSelectedEventAction} = useActions();
	const {selectedObjects: {camera}} = useSelector(state => state.ports)

	let allTypeVessel = camera.events.map(b => b.typeVessel);

	allTypeVessel = allTypeVessel.filter((item, pos) => allTypeVessel.indexOf(item) === pos);


	const boat = allTypeVessel.map((type, i) => {
		return (
			<div className={classes.root} key={i * 2}>
				<List component="nav" aria-label="main mailbox folders">
					<ListItem button onClick={() => SelectedEventAction(i)}>
						<ListItemText primary={type} align="center"/>
					</ListItem>
				</List>
				<Divider/>
			</div>
		)
	});

	return (
		<div>
			<List component="nav" aria-label="main mailbox folders">
				<ListItem button onClick={ClearSelectedEventAction}>
					<ListItemText primary={`All Events ${camera.name}`} align="center"/>
				</ListItem>
			</List>
			<Divider/>
			{boat}
		</div>
	);
}