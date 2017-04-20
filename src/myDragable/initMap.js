import Tools from './Tools'
import action from '../flux/action';
function getPos() {
	let rowIndex = 0,
		colIndex = 0,
		rows = 5,
		width = 500 / rows,
		h = 200,
		w = width / 1;
	return class fn {
		static initPos() {
			if (rowIndex > rows) {
				rowIndex = 0;
				colIndex++
			}
			return {
				x: 10 * (rowIndex + 1) + width * rowIndex++,
				y: h * colIndex + 10 * (colIndex + 1)
			}
		}
		static superiorInit(grids, conWidth) {
			// console.log(css.width);
			grids.sort(initSort)
			let compositor = compositorify();

			//排序好后开始排队
			grids.forEach((d, i) => {
				let newInfo = {};
				let curEleIndex = d.ele.getAttribute('data-index');
				let composited= compositor(d)
				Object.assign(newInfo, d, {
					y: composited.y,
					x: composited.x,
				})
				setCss(newInfo);
				action.modifyStoredGrids(newInfo, curEleIndex);
				action.saveGridStates({
					x: newInfo.x,
					y: newInfo.y,
				}, curEleIndex);
			})


		}
		static whereToDrop(pos) {
			let rels = Tools.gridRels(pos);
			let leftRel = rels.left
			//左边最远
			leftRel.sort((a, b) => {
				return a.x - b.x;
			})
			let farRightEle = leftRel[leftRel.length - 1];
			let farRightX = 0;
			if (farRightEle) { farRightX = farRightEle.x + farRightEle.w; }
			let floor = Math.floor;
			let x = floor(pos.x / w),
				y = floor(pos.y / h);
			let target = {
				x: x * w + 10 * (x + 1),
				// y: y * h + 10 * (y + 1)
				// x: x * w,
				y: y * h
			}
			let targetLast = {
				// x: x * w + 10 * (x + 1) - w,
				// y: y * h + 10 * (y + 1)
				x: x * w - w,
				y: y * h
			}
			if (farRightX > targetLast.x) {
				target.x = farRightX + 10;
			}
			//上方最远
			let farTop = 0;
			let beyondRel = rels.beyond;
			beyondRel.push(...rels.equal)
			beyondRel.sort((a, b) => {
				return a.y - b.y
			})

			for (let i = 0; i < beyondRel.length; i++) {
				let ele = beyondRel[i],
					tempY = ele.y + ele.h;
				farTop = farTop > tempY ? farTop : tempY;
			}
			target.y = farTop + 10;
			Object.assign(pos, target);
			return pos
		}
		static agentPos(pos) {
			let floor = Math.floor;
			let x = floor(pos.x / width),
				y = floor(pos.y / h);
			let target = {
				x: x * width + 10 * (x + 1),
				y: y * h + 10 * (y + 1)

			}
			return target
		}
	}
}
export default getPos();

//测试时的工具
function convert(arr) {
	let copy = [];
	for (let i = 0; i < arr.length; i++) {
		copy[i] = arr[i].ele
	}
	return copy
}
//设置css
function setCss(nodeInfo) {
	let node = nodeInfo.ele,
		x = nodeInfo.x,
		y = nodeInfo.y;
	node.style.left = '0px';
	node.style.top = '0px';
	node.style.transition = 'all 0.5s ease';
	node.style.transform = `translate(${x}px, ${y}px)`;
}
//从数组中找到元素
function lkEle(grids, ele) {
	for (let i = 0; i < grids.length; i++) {
		if (grids[i].ele === ele) {
			return i;
		}
	}
	return -1;
}
//init排序
function initSort(a, b) {
	let define;
	// if(a.x-b.x<=0){
	// 	if(b.x-a.x<a.w){//一列
	// 		define = a.y - b.y
	// 	} else { //不是一列
	// 		define = -1
	// 	}
	// } else if(a.x-b.x>0){
	// 	if(a.x-b.x<b.w){//一列
	// 		define = a.y - b.y
	// 	} else {//不是一列
	// 		define = 1
	// 	}
	// }
	if (Math.abs(b.y - a.y) < b.h) {//一排
		if (a.x - b.x <= 0) {
			define = -1;
		} else if (a.x - b.x > 0) {
			define = 1;
		}
	} else {//不是一排
		if (a.y >= b.y) {
			define = 1
		} else {
			define = -1
		}
	}
	return define
}

function compositorify() {
	let map = [];
	function getFromMap(x, y, w, h, index) {
		let maxY = 0,deltaX =0;
		for (let i = 0; i < map.length; i++) {
			let tempMap = map[i];
			let start = tempMap.start,
				end = tempMap.start + tempMap.w;
			let delta = 0;
			if (start >= x) {
				delta = end - x
			} else {
				delta = x + w - start
			}
			if (delta < tempMap.w + w) {
				//有交集
				let tempY = tempMap.y + tempMap.h;
				maxY = maxY>tempY?maxY:tempY;
			}
			if ((delta === tempMap.w + w)&&start < x) {
				deltaX = 10;
			}
		}
		maxY += 10;
		let maxX = x+deltaX;
		maxX = maxX===0?10:maxX;
		map.push({
			index: index,
			start:maxX,
			y: maxY,
			w: w,
			h: h
		})
		return {y:maxY,x:maxX};
	}
	return function (info) {
		return getFromMap(info.x, info.y, info.w, info.h,info.ele.getAttribute('data-index'))
	}

}