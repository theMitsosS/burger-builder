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
  const {request, response}=httpClient.interceptors;
  useEffect(()=>{
    return ()=>{
      request.eject(requestInterceptor);
      response.eject(responseInterceptor);
    };
  }, [request, response, requestInterceptor, responseInterceptor]);

  const errorConfirmedHandler = () => {
    setError( null);
  };

  return [error, errorConfirmedHandler];
};
