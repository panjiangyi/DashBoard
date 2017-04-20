import React, { Component } from 'react';
import action from '../flux/action';
import Tools from './Tools';
import { relTrigger ,homeTrigger} from './event';
import { addRelListener, addHomeListener, addStoreListener } from './event';
let agent,outMove;
export default class DragDiv extends Component {
	constructor(props) {
		super(props);
		this.dragedDivCss = {
			width: '200px',
			height: '200px',
			backgroundColor: 'grey',
			position: 'absolute',
			left: '0px',
			top: '0px',
			transform: 'translate(0px, 0px)',
			cursor: 'pointer',
			// touchAction: 'none',
			fontSize: '30px',
		}

	}
	componentWillMount() {
		Object.assign(this.dragedDivCss, this.props.selfStyle)
	}
	componentDidMount() {
		let grid = this.refs.grid;
		grid.addEventListener('mousedown', this.props.mousedown)
		// grid.addEventListener('mouseup', this.props.mouseup);
		grid.addEventListener("transitionend", this.removeTransition);
		this.stroeGrid(this.dragedDivCss);
		addHomeListener(this.move, this.props.index)
		addRelListener(this.getRel)
		addStoreListener(this.thenStore)
		//得到agent
		agent = document.getElementById('agent');
		//resize
		this.refs.resize.addEventListener('mousedown', resizer.dragStart)
	}
	getRel = () => {
		let target = this.refs.grid;
		let nodeInfo = Tools.getGridCss.call(target)
		let rels = Tools.gridRels(nodeInfo);
		let upDn = {
			beyond: rels.beyond,
			below: rels.below,
			equal: rels.equal
		}
		action.StoreRels(upDn, this.props.index);

	}
	move =()=> {
		let grid = this.refs.grid;
		let nodeinfo = Tools.getGridCss.call(grid);
		let agentInfo = Tools.getGridCss.call(agent);
		let beyondRels = Tools.getAllRel(nodeinfo, 'beyond', true);
		if (this.isAgentUpon(nodeinfo, agentInfo)) {
			beyondRels.push(agent);
		}
		let dis = 10;
		for (let i = 0; i < beyondRels.length; i++) {
			let nodeinfo = Tools.getGridCss.call(beyondRels[i]);
			let nodeBottom = nodeinfo.y + nodeinfo.h + 10
			dis = dis > nodeBottom ? dis : nodeBottom;
		}
		Object.assign(nodeinfo, {
			y: dis
		})
		grid.style.transition = 'all 0.5s ease';
		grid.style.transform = `translate(${nodeinfo.x}px, ${dis}px)`;

		//保存方块信息，以备存储
		this.storeNodeInfo = nodeinfo;
	}
	thenStore = () => {
		let nodeinfo = this.storeNodeInfo;
		if (!nodeinfo) return
		action.modifyStoredGrids(nodeinfo);
		action.saveGridStates({
			x: nodeinfo.x,
			y: nodeinfo.y
		}, this.refs.grid.getAttribute('data-index'));
		this.storeNodeInfo = null;
	}
	isAgentUpon(g, a) {
		//是否在上方
		if (a.y <= g.y) {
			let situation1 = g.x >= a.x && g.x <= a.x + a.w,
				situation2 = g.x + g.w >= a.x && g.x + g.w <= a.x + a.w,
				situation3 = g.x < a.x && g.x + g.w > a.x + a.w;
			if (situation1 || situation2 || situation3) {
				// console.log(true);
				return true
			}
		}
		// console.log(false);
		return false
	}
	removeTransition = () => {
		let target = this.refs.grid;
		target.style.transition = 'none';
		target.style.zIndex = 'auto';
	}
	componentWillUnmount() {
		this.refs.grid.removeEventListener("transitionend", this.removeTransition);
	}
	stroeGrid(css) {
		action.storeGrids({
			ele: this.refs.grid,
			x: +css.left.split('px')[0],
			y: +css.top.split('px')[0],
			w: +css.width.split('px')[0],
			h: +css.height.split('px')[0],
		});
	}
	render() {
		return (
			<div ref='grid'
				data-index={this.props.index}
				style={this.dragedDivCss}>
				{this.props.index}
				{/*<span ref='resize' style={{cursor:'se-resize',position:'absolute',right:'0px',bottom:'0px'}}>///</span>*/}
				<img ref='resize' style={{ cursor: 'se-resize', height: '12px', width: '12px', position: 'absolute', right: '0px', bottom: '0px' }} src='assets/imgs/resize-corner.png' />
			</div>
		)
	}
}


let resizer = (function () {
	let originMouseX = 0,
		originMouseY = 0,
		oriW = 0,
		oriH = 0,
		oriInfo,
		finalW,
		finalH,
		target;
	let maxX = null, maxY = null;

	return {
		dragStart(e) {
			target = this.parentNode;
			target.style.zIndex = 999;
			oriInfo = Tools.getGridCss.call(target);
			oriW = oriInfo.w;
			oriH = oriInfo.h;
			e.stopPropagation()
			originMouseX = e.pageX;
			originMouseY = e.pageY;

			//计算右边阻挡方块
			maxX = null;
			maxY = null;
			let rightRel = Tools.gridRels(oriInfo).right;
			for (let i = 0; i < rightRel.length; i++) {
				let temp = rightRel[i];
				if (oriInfo.y > temp.y) {
					if (!maxX || (maxX > temp.x)) {
						maxX = temp.x;
						maxY = temp.y + temp.h;

					}
				}
			}



			document.addEventListener('mousemove', resizer.dragging)
			document.addEventListener('mouseup', resizer.dragEnd)
		},
		dragging(e) {
			e.preventDefault()
			let offsetX = e.pageX;
			let offsetY = e.pageY;
			let moveX = offsetX - originMouseX;
			let moveY = offsetY - originMouseY;
			finalW = oriW + moveX;
			finalH = oriH + moveY;
			finalW = finalW < 50 ? 50 : finalW;
			finalH = finalH < 50 ? 50 : finalH;
			target.style.width = finalW + 'px';
			target.style.height = finalH + 'px';
		},
		dragEnd(e) {
			let transXY = target.style.transform.split('(')[1].split('px'),
				transX = +transXY[0],
				transY = +transXY[1].split(' ')[1];
			let nodeInfo = {
				ele: target,
				x: transX,
				y: transY,
				w: finalW,
				h: finalH
			}
			//方块失效
			// Tools.disable(target)
			//激活agent
			// agent.style.transform = `translate(${transX}px, ${transY}px)`;
			agent.style.transform = `translate(${-100000}px, ${-100000}px)`;
			agent.style.width = finalW + 'px';
			agent.style.height = finalH + 'px';
			agent.style.display = 'block';
			//计算每个方块位置信息
			relTrigger()
			//如果右边有方块阻挡
			if (maxX || maxY) {
				if (nodeInfo.x + nodeInfo.w > maxX) {
					nodeInfo.y = maxY + 10
				}
			}
			Tools.setCss(nodeInfo);
			//保存当前方块信息
			Tools.saveGridState(nodeInfo)
			target.style.zIndex = 'auto';
			//触发其他方块移动
			homeTrigger([target.getAttribute('data-index')])
			Tools.trig(oriInfo)
			Tools.trig(nodeInfo)

			//取消拖拽事件侦听
			document.removeEventListener('mousemove', resizer.dragging)
			document.removeEventListener('mouseup', resizer.dragEnd)
		}
	}
})()