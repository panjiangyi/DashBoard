 function getPos() {
 	let rowIndex = 0,
 		colIndex = 0,
 		rows = 10,
 		h = 200,
 		width = 2000/rows;
 	return class fn {
 		static initPos() {
 			if (rowIndex > rows) {
 				rowIndex = 0;
 				colIndex++
 			}
 			return {
 				x: 10 * (rowIndex + 1) + width * rowIndex++,
 				y: h * colIndex + 10 * colIndex
 			}
 		}
 		static whereToDrop(pos){
 			let floor = Math.floor;
 			let x = floor(pos.x/width),
 				y = floor(pos.y/h);
 				return {
 					x:x*width+10*(x+1),
 					y:y*width+10*y
 				}
 		}
 	}
 }
 export default getPos();