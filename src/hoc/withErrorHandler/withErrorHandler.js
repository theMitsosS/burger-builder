import React from 'react';
import Modal from '../../components/UI/modal/modal';
import Aux from '../Aux/Aux';
import useHttpErrorHandler from '../../hooks/http-error';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);
    return (
      <Aux>
        <Modal closeModal={clearError} show={error != null}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};
export default withErrorHandler;
