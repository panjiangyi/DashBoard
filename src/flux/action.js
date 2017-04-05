import dispatcher from './dispatcher';
import fluxConstants from './constants';

export default class Actions {
	static 	toggleLeftBar() {
		dispatcher.dispatch({
			type: fluxConstants.TOGGLE_LEFT_BAR,
		});
	}
	static 	toggleDropOutManu(target) {
		dispatcher.dispatch({
			type: fluxConstants.DROP_OUT_MANU,
			target:target
		});
	}
	static 	getPhotoUrl() {
		dispatcher.dispatch({
			type: fluxConstants.PHOTO_URL,
		});
	}
	static 	storeGrids(node) {
		dispatcher.dispatch({
			type: fluxConstants.STORE_GRIDS,
			node:node
		});
	}	
	static 	modifyStoredGrids(node) {
		dispatcher.dispatch({
			type: fluxConstants.MODIFY_STORED_GRIDS_POS,
			node:node
		});
	}
	static 	saveGridStates(o,i) {
		dispatcher.dispatch({
			type: fluxConstants.SAVE_DRAG_POS,
			node:node
		});
	}
}