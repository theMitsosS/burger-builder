import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
      .map((igKey, value) => {
        return [...Array(props.ingredients[igKey])].map((_, index) => {
          return <BurgerIngredient key={igKey + index} type={igKey} />;
        });
      })
      .reduce((prevValue, currentValue) => {
        return prevValue.concat(currentValue);
      }, []);
  transformedIngredients =
		transformedIngredients.length === 0 ? (
			<p> Please start adding ingredients</p>
		) : (
			transformedIngredients
		);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
