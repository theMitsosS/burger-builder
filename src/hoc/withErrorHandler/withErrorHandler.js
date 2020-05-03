import React, { Component } from "react";
import Modal from "../../components/UI/modal/modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		};
		UNSAFE_componentWillMount() {
			this.requestInterceptor= axios.interceptors.request.use(request => {
				this.setState({ error: null });
				return request;
			});
			this.responseInterceptor= axios.interceptors.response.use(null, error => {
				this.setState({ error: error });
				return error;
			});
		}
		componentWillUnmount() {
			axios.interceptors.request.eject(this.requestInterceptor);
			axios.interceptors.response.eject(this.responseInterceptor);
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};

		render() {
			return (
				<Aux>
					<Modal
						closeModal={this.errorConfirmedHandler}
						show={this.state.error != null}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			);
		}
	};
};
export default withErrorHandler;
