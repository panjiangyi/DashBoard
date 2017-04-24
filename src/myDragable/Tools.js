import judgePostion from './beyondOrBlow';
import Store from './../flux/store';
import action from './../flux/action';
import { homeTrigger } from './event';
export default class Tools {
	//设置container高度
	static hightCon() {
		let allNodes = Store.getState().gridsNode;
		let maxY = 0;
		for (let i = 0; i < allNodes.length; i++) {
			let tempNode = allNodes[i];
			let tempY = tempNode.y + tempNode.h;
			if (maxY < tempY) {
				maxY = tempY
			}
		}
		return maxY + 10 + 'px'
	}
	static setCss(nodeInfo) {
		let node = nodeInfo.ele,
			x = nodeInfo.x,
			y = nodeInfo.y;
		node.style.left = '0px';
		node.style.top = '0px';
		node.style.transition = 'transform 0.5s ease';
		node.style.transform = `translate(${x}px, ${y}px)`;
	}
	static trig(nodeInfo, state) {
		let eleArr = Tools.getAllRel(nodeInfo, 'below', true);
		let iArr = [];
		eleArr.sort((a, b) => {
			let cssa = Tools.getGridCss.call(a);
			let cssb = Tools.getGridCss.call(b)
			return cssa.y - cssb.y
		})
		eleArr.forEach(function (d, i) {
			let index = d.getAttribute('data-index');
			iArr.push(index)
		})
		homeTrigger(iArr, state);
	}
	static saveGridState(nodeInfo) {
		//修改Store中的方块信息
		action.modifyStoredGrids(nodeInfo);
		action.saveGridStates({
			x: nodeInfo.x,
			y: nodeInfo.y
		}, nodeInfo.ele.getAttribute('data-index'));
	}
	//使被拖动方块不存在与rel中
	static disable(ele) {
		action.modifyStoredGrids({
			ele: ele,
			x: -100,
			y: -100,
			w: 0,
			h: 0,
		})
	}
	static able(ele) {
		let nodeinfo = Tools.getGridCss.call(ele);
		action.modifyStoredGrids(nodeinfo)
	}
	static getGridCss() {
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
	static gridRels(node) {
		let originRel = judgePostion.gridDetermine.call(node.ele, node.x, node.y, node.w, node.h);
		return originRel
	}
	static getAllRel(node, dir, needEqual) {
		let rels = Tools.gridRels(node);
		let dirRel = rels[dir];//直接和自己有关的方块
		let relSet = new Set();
		if (needEqual) {
			dirRel.push(...rels['equal'])
		}
		dirRel.forEach(d => {
			relSet.add(d.ele)
		})

		for (let i = 0; i < dirRel.length; i++) {
			let ele = dirRel[i].ele
			let index = ele.getAttribute('data-index');
			// try {
			let rel = Store.getState().rels[index][dir];
			rel.forEach(d => {
				relSet.add(d.ele)
			})
			// } catch (e) {
			// console.debug(e)
			// }
		}
		return [...relSet]
	}
}
