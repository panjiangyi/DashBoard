 function getPos(){
	let rowIndex=0,colIndex=0,rows=10,h=200;
	return function(){
		let width = 1920/rows;
		console.log(width)
		if(rowIndex>rows){
			rowIndex=0;
			colIndex++
		}
		return {
			x:10*(rowIndex+1)+width*rowIndex++,
			y:h*colIndex+10*colIndex
		}
	}
}
 export default getPos();
