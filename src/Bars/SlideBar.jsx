import React, {Component } from 'react';
import {Drawer,AppBar,MenuItem } from 'material-ui';
import DropOutManu from './DropOutManu.jsx'
import action from '../flux/action'
import {Link} from 'react-router';
 class SlideBar extends Component {
  constructor(o){
  	super(o)
  }


  handleClose(){
    action.toggleLeftBar();
  }

  render() {
    return (
        <Drawer
        overlayStyle={{backgroundColor:'transparent'}}
          docked={false}
          width={200}
          open={this.props.isToggle}
          onRequestChange={this.handleClose}
        >
          <AppBar showMenuIconButton={false} title="Select"/>
          <MenuItem children={<Link to={'/photo'}>photo</Link>} onTouchTap={this.handleClose} />
          <DropOutManu />
        </Drawer>
    );
  }
}
 export default SlideBar