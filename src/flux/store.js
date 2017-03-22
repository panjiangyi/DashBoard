import {
	EventEmitter
} from 'fbemitter';
import dispatcher from './dispatcher';
import fluxConstants from './constants';

let __emitter = new EventEmitter();
let data = {
	leftBarToggle:false,
	dropOutManu:{
		open: false,
      	anchorEl:null,
	},
	photoUrls:[
              'http://p1.bqimg.com/588570/3565fef562d6caa1s.jpg',
              'http://p1.bqimg.com/588570/74add1d3828de6f2s.jpg',
              'http://i4.buimg.com/588570/6a4353b4fbe5a682t.jpg',
              'http://i4.buimg.com/588570/1c0a539fb8ac3e88t.jpg',
              'http://p1.bqimg.com/588570/74add1d3828de6f2s.jpg',
              'http://p1.bqimg.com/588570/74add1d3828de6f2s.jpg',
              'http://p1.bqimg.com/588570/74add1d3828de6f2s.jpg',
              'http://p1.bqimg.com/588570/74add1d3828de6f2s.jpg',
              'http://p1.bqimg.com/588570/74add1d3828de6f2s.jpg',
	],
};
let appStore = {
	getState() {
		return data;
	},
	addListener: (evt,callback) => {
		return __emitter.addListener(evt, callback);
	},
};
dispatcher.register((action) => {
	switch (action.type) {
		case fluxConstants.TOGGLE_LEFT_BAR:
			data.leftBarToggle = !data.leftBarToggle;
			__emitter.emit(fluxConstants.TOGGLE_LEFT_BAR);
			break;
		case fluxConstants.DROP_OUT_MANU:
			data.dropOutManu.open = !data.dropOutManu.open;
			data.dropOutManu.anchorEl = action.target;
			__emitter.emit(fluxConstants.DROP_OUT_MANU);
			break;
		case fluxConstants.PHOTO_URL:
			__emitter.emit(fluxConstants.PHOTO_URL);
			break;
	}
});
export default appStore;