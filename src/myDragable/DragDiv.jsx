import React,{Component} from 'react';
const dragedDivCss = {
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


export default class DragDiv extends Component {
	constructor(props) {
		super(props);
		
	}
	componentWillMount() {
		Object.assign(dragedDivCss,this.props.selfStyle)
	}
	componentDidMount() {
		this.refs.grid.addEventListener('mousedown',this.props.mousedown)
		this.refs.grid.addEventListener('mouseup',this.props.mouseup)
	}
	render() {
		return (
			<div ref='grid' 
			data-index={this.props.index}
			style = {dragedDivCss}>
				{this.props.index}
			</div>
			)
	}
}