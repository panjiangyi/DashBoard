import React, {
	Component
} from 'react';
import Store from './../flux/store';
import dragStore from './../flux/dragStore';
import action from './../flux/action';
import fluxConstants from './../flux/constants';
import judgePostion from './beyondOrBlow';
import initMap from './initMap';
import Tools from './Tools';
import agentFac from './agentFac';
import { relTrigger } from './event';
let children = [];
let agent = null;
let dragTarget = null;
let dragListener = (function () {
	let lastMouseX = 0,
		lastMouseY = 0,
		oldEleX = 0,
		oldEleY = 0,
		oldAgentXY = { x: 0, y: 0, w: 0, h: 0 },
		target = null,
		lastTarget = null,
		index = null;
	return {
		dragStart(e) {
			e.preventDefault();
			dragTarget = this;
			index = this.getAttribute('data-index');
			this.style.zIndex = 999;
			if (lastTarget !== this) {
				let oldXY = dragStore.getState(index);
				oldXY ? (oldEleX = oldXY.x, oldEleY = oldXY.y) : (oldEleX = 0, oldEleY = 0);
				target = null;
			};
			lastTarget = target = this;
			lastMouseX = e.pageX;
			lastMouseY = e.pageY;
			document.addEventListener('mousemove', dragListener.dragging)
			document.addEventListener('mouseup', dragListener.dragEnd)
			//推拽开始时方块位置大小
			let nodeInfo = Tools.getGridCss.call(this);
			agentFac.start.call(agent, nodeInfo);
			saveGridState(nodeInfo)
		},
		dragging: function (e) {
			relTrigger();
			e.preventDefault();
			let offsetX = e.pageX;
			let offsetY = e.pageY;
			let moveX = offsetX - lastMouseX;
			let moveY = offsetY - lastMouseY;
			let newEleX = oldEleX + moveX;
			let newEleY = oldEleY + moveY;
			target.style.transform = `translate(${newEleX}px, ${newEleY}px)`;
			agentFac.dragging.call(target, newEleX, newEleY);
			oldEleX = newEleX;
			oldEleY = newEleY;
			lastMouseX = offsetX;
			lastMouseY = offsetY;
		},
		dragEnd(e) {
			e.preventDefault();
			//推拽结束后方块位置大小
			let nodeInfo = Tools.getGridCss.call(dragTarget);
			//拖拽托书后方块的归宿
			// let targetPos = targetArea(nodeInfo);
			let targetPos = agentFac.end(dragTarget);
			//方块归位
			goHome.call(dragTarget, nodeInfo, targetPos);
			//归位后的位置与拖拽结束后的位置合并
			Object.assign(nodeInfo, targetPos);
			//修改Store和statusfac中的方块信息
			saveGridState(nodeInfo);
			oldEleX = targetPos.x;
			oldEleY = targetPos.y;
			//取消拖拽事件侦听
			document.removeEventListener('mousemove', dragListener.dragging)
			document.removeEventListener('mouseup', dragListener.dragEnd)
		}
	}
})()

function saveGridState(nodeInfo) {
	//修改Store中的方块信息
	action.modifyStoredGrids(nodeInfo);
	action.saveGridStates({
		x: nodeInfo.x,
		y: nodeInfo.y
	}, nodeInfo.ele.getAttribute('data-index'));
}

//回到归宿
function goHome(originPos, targetPos) {
	if (originPos.y === targetPos.y) {
		return
	}
	this.style.transition = 'all 0.2s ease';
	this.style.transform = `translate(${targetPos.x}px, ${targetPos.y}px)`
}
//拖拽结束后，方块的归宿
function targetArea(n) {
	let tempHome = initMap.whereToDrop(n);
	let newN = {}
	Object.assign(newN, n, tempHome)
	//加入方块到临时home，上方方块
	let beyondArr = Tools.getAllRel(newN, 'beyond');
	//计算上方最后一个方块的下边缘Y坐标值
	let distance = 0;
	for (let i = 0; i < beyondArr.length; i++) {
		let ele = beyondArr[i];
		let pos = Tools.getGridCss.call(ele);
		let bottomY = pos.y + pos.h;
		distance = bottomY > distance ? bottomY : distance;
	}
	distance += 10;
	tempHome.y = distance;
	return tempHome
}


function firstTimeToState(node) {
	let pos = initMap.initPos();
	node.style.left = '0px';
	node.style.top = '0px';
	node.style.transition = 'all 0.5s ease';
	node.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
	let newPos = Tools.getGridCss.call(node);
	saveGridState(newPos)
}



export default class MyDragable extends Component {
	constructor(props) {
		super(props);

	}
	componentWillMount() {

	}
	componentDidMount() {
		let grids = Store.getState().gridsNode;
		agent = this.refs.agent;
		let conWidth = document.defaultView.getComputedStyle(this.refs.container).width;

		//加载动画
		setTimeout(() => {
			initMap.superiorInit(grids,conWidth);
		}, 0)
	}
	componentWillUnmount() {
	}
	render() {
		children = []
		this.props.children.forEach(function (ele, i) {
			children.push(React.cloneElement(ele, {
				mousedown: dragListener.dragStart,
				// mouseup: dragListener.dragEnd,
				key: i
			}))
		})
		return (
			<div ref='container' style={{ position: 'relative', backgroundColor: 'red', touchAction: 'none' }}>
				<div id='agent' ref='agent' style={{ boxShadow: '10px 10px 5px #888888', display: 'none', height: '100px', width: '100px', backgroundColor: 'rgba(255,255,0,0.5)', position: 'absolute', left: '0px', right: '0px' }}> </div>
				{children}
			</div>
		);
	}
};


