import {
	EventEmitter
} from 'fbemitter';
let event = new EventEmitter();
//home 事件
function addHomeListener(callback, i) {
	return event.addListener(`getyourselfgrid${i}`, callback);
};
function homeTrigger(iarr, state) {
	// console.log('trigger')
	// iarr.forEach((i, index) => {
	// 	event.emit(`getyourselfgrid${i}`, state);
	// })
	for(let i=0;i<iarr.length;i++){
		event.emit(`getyourselfgrid${iarr[i]}`, state);
	}
	storeTrigger()

};


//取得每个方块自己关系的事件
function addRelListener(callback) {
	return event.addListener('getyourallgrid', callback);
};
function relTrigger() {
	event.emit('getyourallgrid');
};
//home结束后，保存状态的事件
function addStoreListener(callback) {
	return event.addListener('getyourallgridStored', callback);
};
function storeTrigger() {
	event.emit('getyourallgridStored');
};
export { addHomeListener, homeTrigger, addRelListener, relTrigger, addStoreListener } 
