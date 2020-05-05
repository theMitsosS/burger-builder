import {useState, useEffect} from 'react';


export default (httpClient)=>{
  const [error, setError]=useState(null);

  const requestInterceptor= httpClient.interceptors.request.use((request) => {
    setError(null);
    return request;
  });
  const responseInterceptor= httpClient.interceptors.response.use(null, (err) => {
    setError(err);
    return err;
  });
  useEffect(()=>{
    return ()=>{
      httpClient.interceptors.request.eject(requestInterceptor);
      httpClient.interceptors.response.eject(responseInterceptor);
    };
  }, [requestInterceptor, responseInterceptor]);

  const errorConfirmedHandler = () => {
    setError( null);
  };

  return [error, errorConfirmedHandler];
};
