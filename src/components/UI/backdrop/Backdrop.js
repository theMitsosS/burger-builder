import React from 'react';
import classes from './backdrop.module.css';
const backdrop = (props) => {
  return props.show ? (
		<div onClick={() => props.clicked(false)} className={classes.Backdrop} />
	) : null;
};

export default backdrop;
