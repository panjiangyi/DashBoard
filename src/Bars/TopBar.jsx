import React, {Component } from 'react';
import {render} from 'react-dom';
import {AppBar,FlatButton} from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import action from '../flux/action'
 class TopAppBar extends Component {

  constructor(o){
  	super(o)
  }
  toggleLeftBar(){
    action.toggleLeftBar();
  }
  render() {
    return (
        <AppBar
          onLeftIconButtonTouchTap={this.toggleLeftBar}
          title="Title"
          iconElementRight={<FlatButton  label='settings' />}
        />
    );
  }
}
 export default TopAppBar