import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/navigation/toolbar/Toolbar';
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
	state={
		showSideDrawer:false
	};
	sideDrawerClosedToggler=()=>{
		this.setState(
			(prevState)=>{
				return {
					showSideDrawer: !prevState.showSideDrawer
				}
			}
		)
	};
  render() {
    return (
      <Aux>
        <Toolbar isAuthenticated={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerClosedToggler} />
        <SideDrawer isAuthenticated={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedToggler} />
        <main className={classes.Content}> {this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps=(state)=>{
	return{
		isAuthenticated:state.auth.token!==null
	}
};

export default connect(mapStateToProps)(Layout);
