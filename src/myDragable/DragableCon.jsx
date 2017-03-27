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
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
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