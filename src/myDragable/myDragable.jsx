import React,{Component} from 'react';
import Store from './../flux/store';
import action from './../flux/action';
import fluxConstants from './../flux/constants';
import judgePostion from './beyondOrBlow';
import map from './map';

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
				index = this.getAttribute('data-index');
				this.style.zIndex = 999;
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
				//推拽结束后方块位置大小
				let nodeInfo = getGridCss.call(this);
				//拖拽托书后方块的归宿
				let targetPos = targetArea(nodeInfo);
				//方块归位
				goHome.call(this,targetPos);
				//归位后的位置与拖拽结束后的位置合并
				Object.assign(nodeInfo,targetPos);
				//修改Store中的方块信息
				storeGrid(nodeInfo);
				//方块归位后，与其他方块的空间关系
				let relative = getDragEndGridPos(nodeInfo);
				console.log(relative);
				//储存下一次拖拽的初始位置
				statusfac.save(targetPos,index);
				oldEleX = targetPos.x;
				oldEleY = targetPos.y;
				this.style.zIndex = 'auto';
				//取消拖拽事件侦听
				document.removeEventListener('mousemove',dragListener.dragging)
			}
		}
	})()
//回到归宿
function  goHome(o){
	this.style.transition = 'all 0.2s ease';
	this.style.transform = `translate(${o.x}px, ${o.y}px)`
}
//计算方块中心点的当前坐标
function targetArea(n){
	let barycenter = {
		x:n.x+n.w/2,
		y:n.y+n.h/2,
	}
	return map.whereToDrop(barycenter);
}
	//计算方块位置和大小
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
//修改Store中的方块信息
function storeGrid(node){
	action.modifyStoredGrids(node);
}
//得到拖拽结束后的方块与其他方块的位置关系
function getDragEndGridPos(node){
	return judgePostion.gridDetermine.call(node.ele,node.x,node.y,node.w,node.h);
}
function firstTimeToState(node){
	let pos = map.initPos();
	node.style.left = '0px';
	node.style.top = '0px';
	node.style.transition = 'all 0.5s ease';
	node.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
	let newPos = getGridCss.call(node);
	statusfac.save({
					x:newPos.x,
					y:newPos.y
				},node.getAttribute('data-index'));
	storeGrid(newPos)

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
		let grids = Store.getState().gridsNode;
		setTimeout(()=>{
		for(let i=0;i<grids.length;i++){
			firstTimeToState(grids[i].ele);
		}
		},0)
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


