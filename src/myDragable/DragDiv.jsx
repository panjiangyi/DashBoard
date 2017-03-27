import React,{Component} from 'react';
import action from '../flux/action'



export default class DragDiv extends Component {
	constructor(props) {
		super(props);
		this.dragedDivCss ={
				width:'200px',
				height:'200px',
				backgroundColor:'grey',
				position:'absolute',
				left:'0px',
				top:'0px',
				transform:'translate(0px, 0px)',
				cursor:'pointer',
				touchAction:'none',
				fontSize:'30px',
		}
		
	}
	componentWillMount() {
		Object.assign(this.dragedDivCss,this.props.selfStyle)
	}
	componentDidMount() {
		this.refs.grid.addEventListener('mousedown',this.props.mousedown)
		this.refs.grid.addEventListener('mouseup',this.props.mouseup);

		this.stroeGrid(this.dragedDivCss);
	}
	stroeGrid(css){
		action.storeGrids({
			ele:this.refs.grid,
			x:+css.left.split('px')[0],
			y:+css.top.split('px')[0],
			w:+css.width.split('px')[0],
			h:+css.height.split('px')[0],
		});
	}
	render() {
		return (
			<div ref='grid' 
			data-index={this.props.index}
			style = {this.dragedDivCss}>
				{this.props.index}
			</div>
			)
	}
}
