import {
	EventEmitter
} from 'fbemitter';
let event = new EventEmitter();
function addListener(callback) {
	return event.addListener('getyourselfgrid', callback);
};
function trigger() {
	event.emit('getyourselfgrid');
};
export { addListener, trigger }  