import React, {useState, useEffect} from 'react';
import Modal from '../../components/UI/modal/modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props)=> {
    const [error, setError]=useState(null);

    const requestInterceptor= axios.interceptors.request.use((request) => {
      setError(null);
      return request;
    });
    const responseInterceptor= axios.interceptors.response.use(null, (err) => {
      setError(err);
      return err;
    });
    useEffect(()=>{
      return ()=>{
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      };
    }, [requestInterceptor, responseInterceptor]);

    const errorConfirmedHandler = () => {
      setError( null);
    };

    return (
      <Aux>
        <Modal
          closeModal={errorConfirmedHandler}
          show={error != null}
        >
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};
export default withErrorHandler;
