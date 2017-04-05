import {
	EventEmitter
} from 'fbemitter';
let event = new EventEmitter();
function addHomeListener(callback,i) {
	return event.addListener(`getyourselfgrid${i}`, callback);
};
function homeTrigger(iarr,node) {
	// console.log('trigger')
	iarr.forEach(i=>event.emit(`getyourselfgrid${i}`,node))
};


function addRelListener(callback) {
	return event.addListener('getyourallgrid', callback);
};
function relTrigger() {
	event.emit('getyourallgrid');
};
export { addHomeListener, homeTrigger,addRelListener, relTrigger} 