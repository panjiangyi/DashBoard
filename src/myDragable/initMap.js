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
			let last;
			grids.sort((a, b) => {
				let define;
				if(a.x-b.x<=0){
					if(b.x-a.x<a.w){//一列
						define = a.y - b.y
					} else { //不是一列
						define = -1
					}
				} else if(a.x-b.x>0){
					if(a.x-b.x<b.w){//一列
						define = a.y - b.y
					} else {//不是一列
						define = 1
					}
				}
				// console.log(`${a.ele.innerHTML}--${b.ele.innerHTML}:`, define)

				return define
			})
			// grids.forEach(d=>console.log(d.ele.innerHTML))
			//排序好后开始排队
			for (let i = 0; i < grids.length; i++) {
				let x = 10, y = 10;
				let tempGrid = grids[i];
				let curEle = tempGrid.ele;
				let curEleIndex = curEle.getAttribute('data-index');
				if (i !== 0) {
					// let rels = Tools.gridRels(tempGrid);
					//对左边方块
					let leftArr = Tools.gridRels(tempGrid).left;
					leftArr.sort((a, b) => a.x - b.x);
					if (leftArr.length > 0) {
						let leftEle = leftArr[leftArr.length - 1];
						// x = leftEle.x + leftEle.w + 10;
						x = tempGrid.x
					}

					//对上方方块
					let nodeInfo = {
						ele: curEle,
						x: x,
						y: tempGrid.y,
						w: tempGrid.w,
						h: tempGrid.h
					}
					let beyondArr = Tools.gridRels(nodeInfo).beyond;
					let upY = 10;
					if (beyondArr.length > 0) {
						beyondArr.sort((a, b) => a.y - b.y);
						let upELe = beyondArr[beyondArr.length - 1];
						let a = upELe.y;
						let b = upELe.h;
						upY = a + b + 10;
					}
					y = upY;
					
				}
				let newInfo = {};
				Object.assign(newInfo, tempGrid, {
					x: x,
					y: y
				})
				action.modifyStoredGrids(newInfo, curEleIndex);
				action.saveGridStates({
					x: x,
					y: y,
				}, curEleIndex);
				setCss(curEle, x, y)

			}
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
function setCss(node, x, y) {
	node.style.left = '0px';
	node.style.top = '0px';
	node.style.transition = 'all 0.5s ease';
	node.style.transform = `translate(${x}px, ${y}px)`;
}
//从数组中找到元素
function lkEle(grids,ele){
	for(let i=0;i<grids.length;i++){
		if(grids[i].ele===ele){
			return i;
		}
	}
	return -1;
}