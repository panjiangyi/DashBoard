import React,{Component} from 'react';
import Store from './../flux/store';
import action from './../flux/action';
import fluxConstants from './../flux/constants';
import judgePostion from './beyondOrBlow'
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
				let nodeInfo = getGridCss.call(this)
				getDragEndGridPos(nodeInfo);
				storeGrid(nodeInfo);
				statusfac.save({
					x:oldEleX,
					y:oldEleY
				},index)
				document.removeEventListener('mousemove',dragListener.dragging)
			}
		}
	})()
function getGridCss(){
	let ox= +this.style.left.split('px')[0],
	oy= +this.style.top.split('px')[0],
	w= +this.style.width.split('px')[0],
	h= +this.style.height.split('px')[0],
	d = this.style.transform.split('(')[1].split('px'),
	transX = +d[0],
	transY = +d[1].split(' ')[1];
	return {
		ele:this,
		x:ox+transX,
		y:oy+transY,
		w:w,
		h:h
	}
}
function storeGrid(node){
	action.modifyStoredGrids(node);
}
function getDragEndGridPos(node){
	judgePostion.gridDetermine.call(node.ele,node.x,node.y,node.w,node.h);
}
 export default class MyDragable extends Component {
	constructor(props) {
		super(props);
		
	}
	componentWillMount() {
		this.storeSubscription = Store.addListener(fluxConstants.STORE_GRIDS,() => {
			// console.log(Store.getState().gridsNode)
		});
	}
	componentDidMount() {
		// judgePostion.gridDetermine(336,290,400,100);
	}
	componentWillUnmount() {
		this.storeSubscription.remove();
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


