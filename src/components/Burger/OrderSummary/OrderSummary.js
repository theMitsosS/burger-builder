import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/button/Button';
class OrderSummary extends Component {
 	render() {
    const ingredientSummary = Object.entries(this.props.ingredients).map(
        (ingredient) => {
          return (
            <li key={ingredient[0]}>
              <span style={{textTransform: 'capitalize'}}>{ingredient[0]}</span>
						:{ingredient[1]}
            </li>
          );
        },
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total price: {this.props.price.toFixed(2)} </strong>
        </p>
        <p>Continue to checkout?</p>
        <Button
          btnType="Danger"
          onClick={() => this.props.cancelPurchase(false)}>
					CANCEL
        </Button>
        <Button btnType="Success" onClick={this.props.continuePurchase}>
					CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
