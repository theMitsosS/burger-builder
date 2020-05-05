import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../../store/actions/auth';
import {Redirect} from 'react-router';

const Logout =(props)=> {
  const {onLogout}=props;
  useEffect(()=>{
    onLogout();
  }, [onLogout]);

  return (<Redirect to='/'/>);
};

const mapDispatchToProps=(dispatch)=>{
  return {
    onLogout: ()=>dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);

