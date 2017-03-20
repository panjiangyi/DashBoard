import React,{Component } from 'react';
import {Popover,PopoverAnimationVertical,Menu,MenuItem} from 'material-ui';
import action from '../flux/action'
import Stroe from '../flux/store'
import fluxConstants from '../flux/constants'
import {Link} from 'react-router';
export default class PopManu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl:null,
    };
  }
  componentDidMount() {
    this.storeSubscription = Stroe.addListener(fluxConstants.DROP_OUT_MANU,() => this.handleRequest());
  }

  handleRequest= () => {
    this.setState(Stroe.getState().dropOutManu)
  };
  toggleLeftBar=()=>{
    //点击列表外面关闭列表时，dom卸载有延迟，导致快速点击列表会再次出现
    if(Stroe.getState().leftBarToggle){
        action.toggleDropOutManu()
        action.toggleLeftBar()
    }
  }
  render() {
    return (
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.toggleLeftBar}
          animation={PopoverAnimationVertical}
        >
          <Menu onTouchTap={this.toggleLeftBar}>
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem children={<Link to={'/photo1'}>photo1</Link>} />
          </Menu>
        </Popover>
    );
  }
}