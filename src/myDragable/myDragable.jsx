import React, {
	Component
} from 'react';
import Store from './../flux/store';
import action from './../flux/action';
import fluxConstants from './../flux/constants';
import judgePostion from './beyondOrBlow';
import initMap from './initMap';
import Tools from './Tools';
import { addListener, trigger } from './event';
let children = [];
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
			let nodeInfo = getGridCss.call(this);
			trigger()
			let relative = Tools.getAllRel(nodeInfo, 'below')
			awayAwayComeCome.call(this, relative, -210, nodeInfo.ele);
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
			target.style.transform = `translate(${newEleX}px, ${newEleY}px)`
			oldEleX = newEleX;
			oldEleY = newEleY;
			lastMouseX = offsetX;
			lastMouseY = offsetY;
		},
		dragEnd(e) {
			e.preventDefault();
			//推拽结束后方块位置大小
			let nodeInfo = getGridCss.call(this);
			//拖拽托书后方块的归宿
			let targetPos = targetArea(nodeInfo);
			//方块归位
			// console.log(targetPos)
			goHome.call(this, nodeInfo, targetPos);
			//归位后的位置与拖拽结束后的位置合并
			Object.assign(nodeInfo, targetPos);
			//方块归位后，与其他方块的空间关系
			// console.log(nodeInfo)
			let relative = Tools.getAllRel(nodeInfo, 'below')
			// console.log('end:',relative);
			if (!hasSeat(nodeInfo)) {
				awayAwayComeCome.call(this, relative, 210)
			}
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
	storeGrid(nodeInfo);
	statusfac.save({
		x: nodeInfo.x,
		y: nodeInfo.y
	}, nodeInfo.ele.getAttribute('data-index'));
}
//挤开下方方块
function awayAwayComeCome(grids, dis, causeNode) {
	let lastGrid, oriDis = dis;
	grids.sort((a, b) => {
		return getGridCss.call(a).y - getGridCss.call(b).y;
	})
	let lastLoopEle;
	for (let i = 0, ele;
		(ele = grids[i]) != null; i++) {
		if (ele === this) { continue }
		let pos = getGridCss.call(ele);
		if (dis < -0) {
			let isStatic = stem(pos, causeNode);
			if (isStatic === 0) { break }
		} else if (dis >= 0) {
			//计算当前方块与上方的距离,dis减去距离等于此方块要移动的距离,dis不能小于零
			lastLoopEle && (dis = dis - (pos.y - lastLoopEle.y));
			lastLoopEle &&console.log(lastLoopEle,pos.y - lastLoopEle.y)
			if (dis < 0) {
				dis = 0;
			}
			if (dis > oriDis) {
				dis = oriDis;
			}
		}
		let targetPos = {
			x: pos.x,
			y: pos.y + dis
		};
		ele.style.transform = `translate(${targetPos.x}px, ${targetPos.y}px)`
		ele.style.transition = 'all 0.2s ease';
		Object.assign(pos, targetPos);
		saveGridState(pos)
		lastLoopEle = pos;
	}
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
	// let barycenter = {
	// 	   x: n.x + n.w / 2,
	// 	   y: n.y + n.h / 2,
	// }
	let tempHome = initMap.whereToDrop(n);
	let newN = {}
	Object.assign(newN, n, tempHome)
	//加入方块到临时home，上方方块
	// let beyondArr = getDragEndGridPos(n).beyond;
	let beyondArr = Tools.getAllRel(newN, 'beyond')
	//计算上方最后一个方块的下边缘Y坐标值
	let distance = 0;
	for (let i = 0; i < beyondArr.length; i++) {
		let ele = beyondArr[i];
		let pos = getGridCss.call(ele);
		let bottomY = pos.y + pos.h;
		distance = bottomY > distance ? bottomY : distance;
	}
	distance += 10;
	tempHome.y = distance;
	return tempHome
}
//有位置
function hasSeat(node) {
	let belowArr = judgePostion.gridDetermine.call(node.ele, node.x, node.y, node.w, node.h).below;
	let bl = true;
	// console.log(node)
	for (let i = 0; i < belowArr.length; i++) {
		if (belowArr[i].y === node.y) {
			bl = false
			break
		}
	}
	return bl
}
//计算上方是否有阻挡
function stem(node, causeNode) {
	// console.log(node,causeNode)
	let beyondArr = judgePostion.gridDetermine.call(node.ele, node.x, node.y, node.w, node.h).beyond;
	let distance = 0;
	for (let i = 0; i < beyondArr.length; i++) {
		let pos = beyondArr[i];
		if (pos.ele === causeNode) { continue }
		let bottomY = pos.y + pos.h;
		distance = bottomY > distance ? bottomY : distance;
	}
	return node.y - distance - 10
}
//计算方块位置和大小
function getGridCss() {
	let ox = +this.style.left.split('px')[0],
		oy = +this.style.top.split('px')[0],
		w = +this.style.width.split('px')[0],
		h = +this.style.height.split('px')[0],
		d = this.style.transform.split('(')[1].split('px'),
		transX = +d[0],
		transY = +d[1].split(' ')[1];
	return {
		ele: this,
		x: ox + transX,
		y: oy + transY,
		w: w,
		h: h
	}
}
//修改Store中的方块信息
function storeGrid(node) {
	action.modifyStoredGrids(node);
}
//得到拖拽结束后的方块与其他方块的位置关系
function getDragEndGridPos(node) {
	let originRel = judgePostion.gridDetermine.call(node.ele, node.x, node.y, node.w, node.h);
	return originRel
}

function firstTimeToState(node) {
	let pos = initMap.initPos();
	node.style.left = '0px';
	node.style.top = '0px';
	node.style.transition = 'all 0.5s ease';
	node.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
	let newPos = getGridCss.call(node);
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
		setTimeout(() => {
			for (let i = 0; i < grids.length; i++) {
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
				{children}
			</div>
		);
	}
};


