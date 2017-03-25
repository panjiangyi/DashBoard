import React,{Component} from 'react';
let children = [];
var statusfac = (function(){
	let gridStates = [];
	return {
		save(o,i){
			gridStates[i] = o;
		},
		getState(i){
			return gridStates[i];
		},
	}
})()





let dragListener = (function(){
		let lastMouseX=0,lastMouseY=0,
			oldEleX=0,oldEleY=0,
			target=null,lastTarget=null,index=null;
		return {
			dragStart(e){
				index = this.getAttribute('data-index')
				if(lastTarget!==this){
					let oldXY = statusfac.getState(index);
					oldXY?(oldEleX=oldXY.x,oldEleY=oldXY.y):(oldEleX=0,oldEleY=0);
					target=null;
					console.log('true')
				}
				e.preventDefault();
				lastTarget = target = this;
				lastMouseX = e.screenX;
				lastMouseY = e.screenY;
				document.addEventListener('mousemove',dragListener.dragging)
			},
			dragging:function(e){
							let offsetX = e.screenX;
							let offsetY = e.screenY;
							let moveX = offsetX-lastMouseX;
							let moveY = offsetY-lastMouseY;
								let newEleX = oldEleX+moveX;
								let newEleY = oldEleY+moveY;
								target.style.transform = `translate(${newEleX}px, ${newEleY}px)`
								oldEleX = newEleX;
								oldEleY = newEleY;
							 	lastMouseX = offsetX;
								lastMouseY = offsetY;
						},
			dragEnd(e){
				e.preventDefault();
				statusfac.save({
					x:oldEleX,
					y:oldEleY
				},index)
				document.removeEventListener('mousemove',dragListener.dragging)
				// console.log('Dragging end')
			}
		}
	})()
 export default class MyDragable extends Component {
	constructor(props) {
		super(props);
		
	}
	componentWillMount() {

	}
	componentDidMount() {
	}
	render() {
		children = []
		this.props.children.forEach(function(ele,i){
			children.push(React.cloneElement(ele, {
							            mousedown:dragListener.dragStart,
							            mouseup:dragListener.dragEnd,
							            key:i
							          }))
		})
		return (
			<div  ref='container' style={{position:'relative',backgroundColor:'red',touchAction:'none'}}>
			{children}
			</div>
		);
	}
};
