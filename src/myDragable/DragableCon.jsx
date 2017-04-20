import React,{Component} from 'react';
import MyDragable from './MyDragable.jsx';
import DragDiv from './DragDiv.jsx';

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
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor(),left:'800px',top:'851px'}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor(),left:'0px',top:'850px'}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor(),left:'0px',top:'600px'}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor(),left:'400px',top:'400px'}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor(),left:'400px',top:'400px'}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor(),left:'400px',top:'400px',height:'300px'}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor(),left:'400px',top:'400px'}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor(),left:'600px',top:'851px',height:'100px'}}/>
			</MyDragable>
		);
	}
}
function randomColor(){
	let r = Math.random,
		f = Math.floor;
	return `rgb(${f(r()*255)},${f(r()*255)},${f(r()*255)})`
}
let uniqueIndex = (function(){
	let i=0
	return function(){
		return i++
	}
}())