import burgerLogo from '../../assets/images/original.png';
import classes from './logo.module.css';
import React from 'react';
const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
