import React, {Component } from 'react';
import { Router, Route, Link,IndexRoute ,hashHistory,Redirect,browserHistory } from 'react-router';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import Bars from './Bars/BarCon.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
//components
import Photo from './photo/photo.jsx';
import BigImage from './photo/BigImage.jsx'
import Gallary from './gallary/Gallary.jsx'

 
class App extends Component{
	constructor(props) {
		super(props);
	}
	render(){
		return (
				<div>
				  <MuiThemeProvider >
				  	<div>
					  	<Bars />
		  				{this.props.children&&React.cloneElement(this.props.children, {
				            key: this.props.location.pathname
				          })}  
	          		</div>			
				  </MuiThemeProvider>
			   </div>
			)
	}
}

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="/Photo" component={Photo}>
				<Route path="/Photo/img:which" component={BigImage} />
			</Route>
			<Route path="/Photo1" component={Gallary}/>
		</Route>	
	</Router>
), document.getElementById('app'));