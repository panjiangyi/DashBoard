import React,{Component } from 'react';
import {Popover,PopoverAnimationVertical,Menu,MenuItem} from 'material-ui';
import action from '../flux/action';
import PopManu from './PopManu.jsx';
import {Link} from 'react-router';
export default class PopoverExampleAnimation extends Component {

  constructor(props) {
    super(props);

  }
  handleTouchTap(e){
    action.toggleDropOutManu(e.currentTarget)
  }
  render() {
    return (
      <div>
        <MenuItem 
         onTouchTap={this.handleTouchTap}
        >Click me</MenuItem>
        <MenuItem
         onTouchTap={this.handleTouchTap}
        >Click me</MenuItem>
        <PopManu />
      </div>
    );
  }
}