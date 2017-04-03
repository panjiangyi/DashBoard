import Tools from './Tools'
function getPos() {
	let rowIndex = 0,
		colIndex = 0,
		rows = 10,
		h = 200,
		width = 2000 / rows;
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
			let leftRel = Tools.gridRels(pos).left
			leftRel.sort((a, b) => {
				return a.x - b.x;
			})
			let farRightEle = leftRel[leftRel.length - 1];
			let farRightX = 0;
			if (farRightEle) { farRightX = farRightEle.x + farRightEle.w; }
			let floor = Math.floor;
			let x = floor(pos.x / width),
				y = floor(pos.y / h);
			let target = {
				x: x * width + 10 * (x + 1),
				y: y * h + 10 * (y + 1)

			}
			let targetLast = {
				x: x * width + 10 * (x + 1) - width,
				y: y * h + 10 * (y + 1)
			}
			if (farRightX>targetLast.x) {
				target.x = farRightX + 10;
			}
			return target
		}
	}
}
export default getPos();