import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/button/Button';
import {withRouter} from 'react-router';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes awesome!</h1>
      <div style={{width: '100%', marginRight: '-50px'}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" onClick={props.cancel}>
				CANCEL
      </Button>
      <Button btnType="Success" onClick={props.continue}>
				CONTINUE
      </Button>
    </div>
  );
};

export default withRouter(checkoutSummary);
