import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/button/Button";
import classes from "./Auth.module.css";
import {auth, setRedirectPath} from "../../store/actions/auth";
import { connect } from "react-redux";
import Spinner from "../../components/UI/spinner/spinner";
import {Redirect} from "react-router-dom";
import {checkValidity, updateObject} from "../../shared/utility";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "E-mail address"
				},
				value: "",
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "password"
				},
				value: "",
				validation: {
					required: true,
					isEmail: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		},
		isSignUp: false
	};

	componentDidMount() {
		if(!this.props.building){
			this.props.onAuthRedirect('/');
		}
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls=updateObject(this.state.controls,{
			[controlName]: {
				...updateObject(this.state.controls[controlName],{
					value: event.target.value,
					valid: checkValidity(
						event.target.value,
						this.state.controls[controlName].validation
					),
					touched: true
				})
			}
		});
		this.setState({ controls: updatedControls });
	};

	submitHandler = event => {
		event.preventDefault();
		this.props.onSubmitHandler(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignUp
		);
	};

	switchAuthHandler = () => {
		this.setState(prevState => {
			return { isSignUp: !prevState.isSignUp };
		});
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}
		let form = formElementsArray.map(element => (
			<Input
				key={element.id}
				elementType={element.config.elementType}
				elementConfig={element.config.elementConfig}
				value={element.config.value}
				invalid={!element.config.valid}
				shouldValidate={element.config.validation}
				touched={element.config.touched}
				changed={event => this.inputChangedHandler(event, element.id)}
			/>
		));

		if (this.props.loading) {
			form = <Spinner />;
		}
		let errorMessage=null;
		if(this.props.error){
			errorMessage=(
				<p>{this.props.error.message}</p>
			)
		}
		let redirect=null;
		if(this.props.userAuthenticated){
			redirect=<Redirect to={this.props.authRedirect}/>
		}


		return (
			<div className={classes.Auth}>
				{redirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Button btnType="Danger" onClick={this.switchAuthHandler}>
					SWITCH TO {this.state.isSignUp ? "SIGN-IN" : "SIGN-UP"}
				</Button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSubmitHandler: (email, password, isSignUp) =>dispatch(auth(email, password, isSignUp)),
		onAuthRedirect:(path)=>dispatch(setRedirectPath(path))
	};
};

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error:state.auth.error,
		userAuthenticated: state.auth.token!==null,
		authRedirect:state.auth.redirectPath,
		building:state.builder.building
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
