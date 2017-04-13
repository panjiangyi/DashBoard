import Tools from './Tools'
function getPos() {
	let rowIndex = 0,
		colIndex = 0,
		rows = 5,
		width = 500 / rows,
		h = 200,
		w = width/1
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
				x: x * w  - w,
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