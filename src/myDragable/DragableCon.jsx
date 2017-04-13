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
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor(),width:'600px',height:'200px'/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor()/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor(),width:'600px',height:'200px'/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor(),height:'600px'/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
				<DragDiv index={uniqueIndex()} selfStyle={{backgroundColor:randomColor(),width:'500px',height:'300px'/*,height:`${Math.random()*200}px`,width:`${Math.random()*200}px`*/}}/>
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