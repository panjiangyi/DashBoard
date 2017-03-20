import React, {Component } from 'react';
import TopBar from './TopBar.jsx';
import SlideBar from './SlideBar.jsx';
import Store from '../flux/store'
import fluxConstants from '../flux/constants'

export default class BarCon extends Component {
	  constructor(o){
	  	super(o)
	  	this.state = {
	  		toggle:false
	  	}
	  }
	componentDidMount() {
		this.storeSubscription = Store.addListener(fluxConstants.TOGGLE_LEFT_BAR,() => this.handleBarSlide());
	}
	handleBarSlide(){
		this.setState({
			toggle:Store.getState().leftBarToggle
		})
	}
	componentWillUnmount() {
		this.storeSubscription.remove();
	}

	  render() {
	    return (
		    <div>
		      <TopBar />
		      <SlideBar isToggle={this.state.toggle} />
		    </div>
	    );
	  }
}