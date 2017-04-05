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

let children = [];
let agent = null;
var statusfac = (function () {
	let gridStates = [];
	return {
		save(o, i) {
			gridStates[i] = o;
		},
		getState(i) {
			return gridStates[i];
		},
	}
})()
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
			index = this.getAttribute('data-index');
			this.style.zIndex = 999;
			if (lastTarget !== this) {
				let oldXY = statusfac.getState(index);
				oldXY ? (oldEleX = oldXY.x, oldEleY = oldXY.y) : (oldEleX = 0, oldEleY = 0);
				target = null;
			};
			lastTarget = target = this;
			lastMouseX = e.pageX;
			lastMouseY = e.pageY;
			document.addEventListener('mousemove', dragListener.dragging)
			//推拽开始时方块位置大小
			let nodeInfo = Tools.getGridCss.call(this);
			agentFac.start.call(agent, nodeInfo);
			let relative = Tools.getAllRel(nodeInfo, 'below')
			saveGridState(nodeInfo)
		},
		dragging: function (e) {
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
			let nodeInfo = Tools.getGridCss.call(this);
			//拖拽托书后方块的归宿
			// let targetPos = targetArea(nodeInfo);
			let targetPos = agentFac.end(this);
			//方块归位
			// console.log(targetPos)
			goHome.call(this, nodeInfo, targetPos);
			//归位后的位置与拖拽结束后的位置合并
			Object.assign(nodeInfo, targetPos);
			//方块归位后，与其他方块的空间关系
			// console.log(nodeInfo)
			let relative = Tools.getAllRel(nodeInfo, 'below')
			// console.log('end:',relative);
			//修改Store和statusfac中的方块信息
			saveGridState(nodeInfo)
			oldEleX = targetPos.x;
			oldEleY = targetPos.y;
			//取消拖拽事件侦听
			document.removeEventListener('mousemove', dragListener.dragging)

		}
	}
})()

function saveGridState(nodeInfo) {
	//修改Store中的方块信息
	action.modifyStoredGrids(nodeInfo);
	statusfac.save({
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
		this.storeSubscription = Store.addListener(fluxConstants.STORE_GRIDS, () => {
			// console.log(Store.getState().gridsNode)
		});
	}
	componentDidMount() {
		let grids = Store.getState().gridsNode;
		agent = this.refs.agent;
		setTimeout(() => {
			for (let i = 0; i < grids.length; i++) {
				let ele = grids[i].ele;
				if(ele===agent){
					continue
				}
				firstTimeToState(grids[i].ele);
			}
		}, 0)
	}
	componentWillUnmount() {
		this.storeSubscription.remove();
	}
	render() {
		children = []
		this.props.children.forEach(function (ele, i) {
			children.push(React.cloneElement(ele, {
				mousedown: dragListener.dragStart,
				mouseup: dragListener.dragEnd,
				key: i
			}))
		})
		return (
			<div ref='container' style={{ position: 'relative', backgroundColor: 'red', touchAction: 'none' }}>
				<div id='agent' ref='agent' style={{ display: 'none', height: '100px', width: '100px', backgroundColor: 'rgba(255,255,0,0.5)', position: 'absolute', left: '0px', right: '0px', zIndex: '998' }}> </div>
				{children}
			</div>
		);
	}
};


