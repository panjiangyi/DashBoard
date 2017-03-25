import React,{Component} from 'react';
import MyDragable from './MyDragable.jsx';
import DragDiv from './DragDiv.jsx';
const dragedDivCss1 = {
	width:'200px',
	height:'200px',
	backgroundColor:'grey',
	position:'absolute',
	left:'50px',
	top:'100px',
	transform:'translate(0px, 0px)',
	cursor:'pointer',
	touchAction:'none',
}
const dragedDivCss2 = {
	width:'200px',
	height:'200px',
	backgroundColor:'grey',
	position:'absolute',
	left:'350px',
	top:'100px',
	transform:'translate(0px, 0px)',
	cursor:'pointer',
	touchAction:'none',
}
 export default class DragableCon extends Component {
	constructor(props) {
		super(props);
		
	}
	componentWillMount() {

	}
	componentDidMount() {
	
	}
	render() {
		return (
			<MyDragable>
				<DragDiv index={0} selfStyle={{backgroundColor:'red',height:`${Math.random()*300}px`,width:`${Math.random()*300}px`}}/>
				<DragDiv index={1} selfStyle={{backgroundColor:'green',height:`${Math.random()*300}px`,width:`${Math.random()*300}px`}}/>
				<DragDiv index={2} selfStyle={{backgroundColor:'gold',height:`${Math.random()*300}px`,width:`${Math.random()*300}px`}}/>
				<DragDiv index={3} selfStyle={{backgroundColor:'blue',height:`${Math.random()*300}px`,width:`${Math.random()*300}px`}}/>
				<DragDiv index={4} selfStyle={{backgroundColor:'black',height:`${Math.random()*300}px`,width:`${Math.random()*300}px`}}/>
				<DragDiv index={5} selfStyle={{backgroundColor:'yellow',height:`${Math.random()*300}px`,width:`${Math.random()*300}px`}}/>
				<DragDiv index={6} selfStyle={{backgroundColor:'grey',height:`${Math.random()*300}px`,width:`${Math.random()*300}px`}}/>
			</MyDragable>
		);
	}
}
