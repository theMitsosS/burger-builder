import React, {Component} from 'react';
import classes from './modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../backdrop/Backdrop';
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (this.props.show !== nextProps.show)||this.props.children!==nextProps.children;
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.closeModal} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}
export default Modal;
