import React, { Component } from 'react';
import Button from '../../../components/UI/button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import {purchaseBurger} from "../../../store/actions/index";
import {checkValidity} from "../../../shared/utility";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation:{
					required: true
				},
				valid:false,
				touched:false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation:{
					required: true
				},
				valid:false,
				touched:false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation:{
					required: true
				},
				valid:false,
				touched:false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP code'
				},
				value: '',
				validation:{
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid:false,
				touched:false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your e-mail'
				},
				value: '',
				validation:{
					required: true
				},
				valid:false,
				touched:false

			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'cheapest' }
					]
				},
				value: 'fastest',
				valid: true
			},
		},
		formIsValid:false,
	};
	inputChangedHandler=(event,inputIdentifier)=>{
		if(inputIdentifier!=='deliveryMethod'){
			const updatedForm = JSON.parse(JSON.stringify(this.state.orderForm));
			updatedForm[inputIdentifier].value=event.target.value;
			updatedForm[inputIdentifier].touched=true;
			updatedForm[inputIdentifier].valid=checkValidity(event.target.value,updatedForm[inputIdentifier].validation);
			let formIsValid=true;
			for(let input in updatedForm){
					formIsValid=updatedForm[input].valid && formIsValid;
			}
			this.setState({
				orderForm:updatedForm,formIsValid:formIsValid
			});
		}
	};

	orderSubmitHandler = event => {
		event.preventDefault();
		const formData={};
		Object.entries(this.state.orderForm).forEach(
			field=>{
				formData[field[0]]=field[1].value;
			}
		);
		const ingredients= {...this.props.ingredients};
		delete ingredients.totalPrice;
		const price = this.props.price;
		const order = {
			ingredients: ingredients,
			price: price,
			orderData:formData,
			userId:this.props.userId

		};
	this.props.onOrderSubmission(order, this.props.token);
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = (
			<form onSubmit={this.orderSubmitHandler}>
				{formElementsArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event)=>this.inputChangedHandler(event,formElement.id)}
					/>
				))}
				<Button btnType='Success' disabled={!this.state.formIsValid} >
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps=(state)=>{
	return {
		ingredients:state.builder.ingredients,
		price:state.builder.totalPrice,
		loading:state.order.loading,
		token: state.auth.token,
		userId:state.auth.userId
	}
};

const mapDispatchToProps=dispatch=>{
	return{
		onOrderSubmission:(order,token)=> dispatch(purchaseBurger(order,token))
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
