import React, {useEffect, useState} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/button/Button';
import classes from './Auth.module.css';
import {auth, setRedirectPath} from '../../store/actions/auth';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/spinner/spinner';
import {Redirect} from 'react-router-dom';
import {checkValidity, updateObject} from '../../shared/utility';

const Auth =(props)=> {
  const [controls, setControls]=useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'E-mail address',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'password',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignUp, setIsSignUp]=useState(false);
  useEffect(()=>{
    if (!props.building) {
      props.onAuthRedirect('/');
    }
  }, []);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls=updateObject(controls, {
      [controlName]: {
        ...updateObject(controls[controlName], {
          value: event.target.value,
          valid: checkValidity(
              event.target.value,
              controls[controlName].validation,
          ),
          touched: true,
        }),
      },
    });
    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmitHandler(
        controls.email.value,
        controls.password.value,
        isSignUp,
    );
  };

  const switchAuthHandler = () => {
    setIsSignUp((prevState) => (!prevState));
  };

  const formElementsArray = [];
  for (const key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }
  let form = formElementsArray.map((element) => (
    <Input
      key={element.id}
      elementType={element.config.elementType}
      elementConfig={element.config.elementConfig}
      value={element.config.value}
      invalid={!element.config.valid}
      shouldValidate={element.config.validation}
      touched={element.config.touched}
      changed={(event) => inputChangedHandler(event, element.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }
  let errorMessage=null;
  if (props.error) {
    errorMessage=(
      <p>{props.error.message}</p>
    );
  }
  let redirect=null;
  if (props.userAuthenticated) {
    redirect=<Redirect to={props.authRedirect}/>;
  }


  return (
    <div className={classes.Auth}>
      {redirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button btnType="Danger" onClick={switchAuthHandler}>
					SWITCH TO {isSignUp ? 'SIGN-IN' : 'SIGN-UP'}
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitHandler: (email, password, isSignUp) =>dispatch(auth(email, password, isSignUp)),
    onAuthRedirect: (path)=>dispatch(setRedirectPath(path)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    userAuthenticated: state.auth.token!==null,
    authRedirect: state.auth.redirectPath,
    building: state.builder.building,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
