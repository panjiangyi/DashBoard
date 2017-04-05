import {
	EventEmitter
} from 'fbemitter';
import dispatcher from './dispatcher';
import fluxConstants from './constants';

let __emitter = new EventEmitter();
let gridStates = []
let appStore = {
	getState(I) {
		return gridStates[i];
	}
};
dispatcher.register((action) => {
	switch (action.type) {
		case fluxConstants.SAVE_DRAG_POS:
			gridStates[action.i] = action.o;
			break;
	}
});
export default appStore;