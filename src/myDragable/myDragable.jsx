import React,{Component} from 'react';
const dragedDivCss = {
	width:'200px',
	height:'200px',
	backgroundColor:'grey',
	position:'absolute',
	left:'50px',
	top:'100px',
	transform:'translate(0px, 0px)',
	cursor:'pointer',
}

let dragListener = (function(){
		let lastMouseX=0,lastMouseY=0,
			oldEleX=0,oldEleY=0;
		return {
			dragStart(e){
				e.preventDefault();
				lastMouseX = e.screenX;
				lastMouseY = e.screenY;
				this.addEventListener('mousemove',dragListener.dragging)
				console.log('start')
			
			},
			dragging:function(e){
				e.preventDefault();
				console.log('clientX-PageX:',e.clientX-e.pageX,'clientY-PageY:',e.clientY-e.pageY)
							let offsetX = e.screenX;
							let offsetY = e.screenY;
							// console.log(offsetX,offsetY);
							if(offsetX===0&&offsetY===0)return
							let moveX = offsetX-lastMouseX;
							let moveY = offsetY-lastMouseY;
								let newEleX = oldEleX+moveX;
								let newEleY = oldEleY+moveY;
								this.style.transform = `translate(${newEleX}px, ${newEleY}px)`
								oldEleX = newEleX;
								oldEleY = newEleY;
							 	lastMouseX = offsetX;
								lastMouseY = offsetY;
						},
			dragEnd(e){
				// e.preventDefault();
				this.removeEventListener('mousemove',dragListener.dragging)
				console.log('end')
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
		this.refs.willBeDraged.addEventListener('mousedown',dragListener.dragStart,false);
		this.refs.willBeDraged.addEventListener('mouseup',dragListener.dragEnd,false);
		// this.refs.willBeDraged.addEventListener('mouseleave',dragListener.dragEnd,false);
	}
	render() {
		return (
			<div ref='container' style={{transitionProperty:'transform',position:'relative',backgroundColor:'red'}}>
				<div className='dragable' ref='willBeDraged' style={dragedDivCss} />
			</div>
		);
	}
}
// document.body.onscroll = e=>e.preventDefault();
function throttle(fn){
	let i=0;
	return function(e){
		i++;
		if(i>5){
			fn.call(this,e)
			i=0;
		}
	}
}
