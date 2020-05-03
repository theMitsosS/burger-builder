import React from 'react';
import classes from './buildcontrols.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
	const controls = [
		{label: 'Salad', type: 'salad'},
		{label: 'Bacon', type: 'bacon'},
		{label: 'Meat', type: 'meat'},
		{label: 'Cheese', type: 'cheese'},
	];
	return (
		<div className={classes.BuildControls}>
			<p>
				Current Price: <strong>{props.totalPrice.toFixed(2)}</strong>
			</p>
			{controls.map((ctrl) => (
				<BuildControl
					label={ctrl.label}
					key={ctrl.label}
					ingredient={ctrl.type}
					added={() => props.ingredientAdded(ctrl.type)}
					removed={() => props.ingredientRemoved(ctrl.type)}
					type={ctrl.type}
					disabled={props.disabledInfo[ctrl.type]}
				/>
			))}
			<button
				className={classes.OrderButton}
				onClick={() => props.ordered(true)}
				disabled={!props.purchasable}
			>{props.isAuth? 'ORDER NOW': 'SIGN UP TO ORDER'}
			</button>
		</div>
	);
};

export default buildControls;
