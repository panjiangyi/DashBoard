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
				<DragDiv index={0} selfStyle={{backgroundColor:'red',left:'100px'/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={1} selfStyle={{backgroundColor:'green',left:'400px',top:'500px'/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={2} selfStyle={{backgroundColor:'green',left:'400px'/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
				<DragDiv index={3} selfStyle={{backgroundColor:'green',left:'400px',top:'800px'/*height:`${Math.random()*300}px`,width:`${Math.random()*300}px`*/}}/>
			</MyDragable>
		);
	}
}
