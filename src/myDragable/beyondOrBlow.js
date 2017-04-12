import Store from './../flux/store';
export default class Tool {
	static pointDetermine(x, y, node) {
		//grid四个顶点坐标
		let corner = {
			LT: [node.x, node.y],
			/*左上*/
			RT: [node.x + node.w, node.y],
			/*右上*/
			LD: [node.x, node.y + node.h],
			/*左下*/
			RD: [node.x + node.w, node.y + node.h] /*右下*/
		}
		if (x >= corner.LT[0] && x <= corner.RT[0]) {
			if (y < corner.LT[1]) {
				return 'beyond'
			} else if (y >= corner.LT[1] && y <= corner.LD[1]) {
				return 'contain'
			} else if (y > corner.LD[1]) {
				return 'below'
			}
		} else if (x < corner.LT[0]) {
			return 'left'
		} else if (x > corner.RT[0]) {
			return 'right'
		}
	}
	static gridDetermine(x, y, w, h) {
		let belowArr = [],
			beyondArr = [],
			noCrossArr = [],
			leftArr = [],
			rightArr = [],
			equalArr = [];
		let corner = {
			LT: [x, y],
			/*左上*/
			RT: [x + w, y],
			/*右上*/
			LD: [x, y + h],
			/*左下*/
			RD: [x + w, y + h] /*右下*/
		};
		let allGrids = Store.getState().gridsNode;
		for (let i = 0; i < allGrids.length; i++) {
			let node = allGrids[i],
				ele = node.ele;
			if (ele === this) {
				continue
			}
				/*左上*/
			let a = Tool.pointDetermine.call(null, corner.LT[0], corner.LT[1], node),
				/*右上*/
				b = Tool.pointDetermine.call(null, corner.RT[0], corner.RT[1], node),
				/*左下*/
				c = Tool.pointDetermine.call(null, corner.LD[0], corner.LD[1], node),
				/*右下*/
				d = Tool.pointDetermine.call(null, corner.RD[0], corner.RD[1], node); 
			// console.log(oneRow(corner, node));
			let isOneCol = oneCol(a) || oneCol(b) || oneCol(c) || oneCol(d) || (a === 'left' && b === 'right');
			if (isOneCol) {
				if (corner.LT[1] < node.y) {
					// console.log('下方', ele)
					belowArr.push(node);
				} else if(corner.LT[1] === node.y){
					equalArr.push(node);
				} else if(corner.LT[1] > node.y){
					beyondArr.push(node);
				}/* else if (corner.LD[1] >= node.y + node.h) {
					// console.log('上方', ele)
					beyondArr.push(node);
				}*/
			} else if (oneRow(corner, node)) {
				if (a === 'right' && b === 'right') {
					// console.log(a,b)
					leftArr.push(node);
				} else if (a === 'left' && b === 'left') {
					rightArr.push(node);
				}
			} else {
				// console.log('没有交集', ele)
				noCrossArr.push(node);
			}
		}
		return {
			below: belowArr,
			beyond: beyondArr,
			left: leftArr,
			right: rightArr,
			noCross: noCrossArr,
			equal: equalArr
		}
	}
}

function oneCol(text) {
	let bl = text === 'beyond' || text === 'contain' || text === 'below';
	return bl
}

function oneRow(corner, node) {
	return (corner.LT[1] >= node.y && corner.LT[1] <= node.y + node.h) || (corner.LD[1] >= node.y&& corner.LD[1] <= node.y + node.h)
}