import judgePostion from './beyondOrBlow';
import Store from './../flux/store';
export default class Tools {
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
	static getAllRel(node,dir){
		let dirRel = Tools.gridRels(node)[dir];//直接和自己有关的方块
		let relSet = new Set();
			dirRel.forEach(d=>{
				relSet.add(d.ele)
			})
		return [...relSet]
	}
}
