import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
  const ingredients = Object.entries(props.ingredients).map((ingredient) => {
    const ingredientName = `${ingredient[0]} (${ingredient[1]})`;
    return (
      <span
        key={ingredient[0]}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
      >
        {ingredientName}
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>
        Price: <strong>USD {props.price} </strong>
      </p>
      <button onClick={props.delete}>delete</button>
    </div>
  );
};

export default order;
