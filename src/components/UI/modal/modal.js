import React from 'react';
import classes from './modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../backdrop/Backdrop';
const Modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.closeModal} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}>
        {props.children}
      </div>
    </Aux>
  );
};
export default React.memo(
    Modal,
    (prevProps, nextProps) =>
      prevProps.children === nextProps.children &&
    prevProps.show === nextProps.show,
);
