import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
import Aux from '../../../hoc/Aux/Aux';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>
			BurgerBuilder
    </NavigationItem>
    {props.isAuthenticated ? (
			<Aux>
			  <NavigationItem link="/orders">Orders</NavigationItem>
			  <NavigationItem link="/logout">Logout</NavigationItem>
			</Aux>
		) : (
			<NavigationItem link="/auth">Login</NavigationItem>
		)}
  </ul>
);

export default navigationItems;
