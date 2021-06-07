import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {NavLink} from 'react-router-dom';
import './Header.css';
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	}
}));

export const Header = () => {
	const {miniAvatar, allNewNote, portsNewNote} = useSelector(state => state.header);
	const {data, selectedObjects: {port, camera, event}} = useSelector(state => state.ports);
	const {
		ClearSelectedAction,
		AddNewPortsNotificationAction, AddNewCamerasNotificationAction, AddAllNewNotificationAction
	} = useActions();
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	// const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';

	const setPortNotes = () => {
		data.forEach(({cameras: {data}}, portIndex) => {
			let num = 0;
			data.forEach(({events}) => {
				const temp = (events.filter(({newEvent}) => newEvent === true).length);
				num += temp;
			})
			AddNewPortsNotificationAction(portIndex, num);
		})
	};

	const setCameraNotes = () => {
		port.cameras.data.forEach(({events}, i) => {
			const notes = (events.filter(({newEvent}) => !!newEvent)).length;
			AddNewCamerasNotificationAction(i, notes);
		})
	};

	useEffect(() => {
		port.id >= 0 ? setCameraNotes() : setPortNotes();

		AddAllNewNotificationAction(portsNewNote);
	}, [port, camera, event]);

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{vertical: 'top', horizontal: 'right'}}
			id={menuId}
			keepMounted
			transformOrigin={{vertical: 'top', horizontal: 'right'}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			{/* <MenuItem onClick={handleMenuClose}> */}
			{/* <NavLink className={'menu__btn'} to='/profile'>Profile</NavLink> */}
			{/* Profile */}
			{/* </MenuItem> */}
			<MenuItem onClick={handleMenuClose}>
				<NavLink className={'menu__btn'} to='/account'>My account</NavLink>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar position="static" style={{background: '#2d2d2d'}}>
				<Toolbar>
					<NavLink className={'navButtonsHome'}
					         to="/ports"
					         onClick={() => ClearSelectedAction()}
					> ViewFinder
					</NavLink>

					<div className={'navButtons'}>
						<NavLink className={'navButtons__item'}
						         to="/ports"
						         onClick={() => ClearSelectedAction()}
						> Ports
						</NavLink>
					</div>

					<div className={classes.grow}/>
					<div className={classes.sectionDesktop}>

						{/* _________________Управление отображением уведомлений_________________ */}
						<IconButton aria-label="show 4 new mails" color="inherit">
							<Badge badgeContent={0} color="secondary">
								<NavLink to='/ports/'>
									<MailIcon className='header__icons'/>
								</NavLink>
							</Badge>
						</IconButton>
						<IconButton aria-label="show 17 new notifications" color="inherit">
							<Badge badgeContent={allNewNote} color="secondary">
								<NavLink to='/events'>
									<NotificationsIcon className='header__icons'/>
								</NavLink>
							</Badge>
						</IconButton>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							{/* <AccountCircle /> */}
							<img className='header_profile__icon'
							     src={miniAvatar} alt=""/>
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
					</div>
				</Toolbar>
			</AppBar>
			{/* {renderNewMenu} */}
			{renderMenu}
		</div>
	);
}