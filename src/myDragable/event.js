import {
	EventEmitter
} from 'fbemitter';
let event = new EventEmitter();
function addListener(callback,i) {
	return event.addListener(`getyourselfgrid${i}`, callback);
};
function trigger(iarr,node) {
	// console.log('trigger')
	iarr.forEach(i=>event.emit(`getyourselfgrid${i}`,node))
};
export { addListener, trigger } 