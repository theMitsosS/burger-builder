import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import {withRouter} from 'react-router-dom';

const toolbar = (props) => {
	const handleLogoClick = () => {
		props.history.push('/');
	};
	return (
		<header className={classes.Toolbar}>
			<DrawerToggle clicked={props.drawerToggleClicked} />
			<div onClick={handleLogoClick} className={classes.Logo}>
				<Logo />
			</div>
			<nav className={classes.DesktopOnly}>
				<NavigationItems isAuthenticated={props.isAuthenticated} />
			</nav>
		</header>
	);
};

export default withRouter(toolbar);
