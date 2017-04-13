import React, { Component } from 'react';
import action from '../flux/action';
import Tools from './Tools';
import { addRelListener, addHomeListener,addStoreListener } from './event';
export default class DragDiv extends Component {
	constructor(props) {
		super(props);
		this.dragedDivCss = {
			width: '200px',
			height: '200px',
			backgroundColor: 'grey',
			position: 'absolute',
			left: '0px',
			top: '0px',
			transform: 'translate(0px, 0px)',
			cursor: 'pointer',
			// touchAction: 'none',
			fontSize: '30px',
		}

	}
	componentWillMount() {
		Object.assign(this.dragedDivCss, this.props.selfStyle)
	}
	componentDidMount() {
		let grid = this.refs.grid;
		grid.addEventListener('mousedown', this.props.mousedown)
		// grid.addEventListener('mouseup', this.props.mouseup);
		grid.addEventListener("transitionend", this.removeTransition);
		this.stroeGrid(this.dragedDivCss);
		addHomeListener(this.move, this.props.index)
		addRelListener(this.getRel)
		addStoreListener(this.thenStore)
		//得到agent
		this.agent = document.getElementById('agent')
	}
	getRel = () => {
		let target = this.refs.grid;
		let nodeInfo = Tools.getGridCss.call(target)
		let rels = Tools.gridRels(nodeInfo);
		let upDn = {
			beyond: rels.beyond,
			below: rels.below,
			equal: rels.equal
		}
		action.StoreRels(upDn, this.props.index);
		// if(this.props.index===16){
		// 	console.log('161616:',upDn)
		// }
	}
	move = (state) => {
		let grid = this.refs.grid;
		let nodeinfo = Tools.getGridCss.call(grid);
		let agentInfo = Tools.getGridCss.call(this.agent);
		let beyondRels = Tools.getAllRel(nodeinfo, 'beyond', true);
		if (this.isAgentUpon(nodeinfo,agentInfo)) {
			beyondRels.push(this.agent);
		}
		// console.log(`${this.props.index}:`, beyondRels)
		let dis = 10;
		for (let i = 0; i < beyondRels.length; i++) {
			let nodeinfo = Tools.getGridCss.call(beyondRels[i]);
			let nodeBottom = nodeinfo.y + nodeinfo.h + 10
			dis = dis > nodeBottom ? dis : nodeBottom;
		}
		Object.assign(nodeinfo, {
			y: dis
		})
		grid.style.transition = 'all 0.5s ease';
		grid.style.transform = `translate(${nodeinfo.x}px, ${dis}px)`;
		// action.modifyStoredGrids(nodeinfo);
		// action.saveGridStates({
		// 	x: nodeinfo.x,
		// 	y: nodeinfo.y
		// }, grid.getAttribute('data-index'));
		this.storeNodeInfo = nodeinfo;
		// console.log('首先',this.props.index,nodeinfo)
	}
	thenStore=()=>{
		let nodeinfo = this.storeNodeInfo;
		if(!nodeinfo)return 
		// console.log('然后',this.props.index,this.storeNodeInfo)
		action.modifyStoredGrids(nodeinfo);
		action.saveGridStates({
			x: nodeinfo.x,
			y: nodeinfo.y
		}, this.refs.grid.getAttribute('data-index'));
		this.storeNodeInfo = null;
	}
	isAgentUpon(g,a){
		//是否在上方
		if(a.y<=g.y){
			let situation1 = g.x>=a.x&&g.x<=a.x+a.w,
			situation2 = g.x+g.w>=a.x&&g.x+g.w<=a.x+a.w,
			situation3 = g.x<a.x&&g.x+g.w>a.x+a.w;
			if(situation1||situation2||situation3){
				// console.log(true);
				return true
			}
		}
		// console.log(false);
		return false
	}
	removeTransition = () => {
		let target = this.refs.grid;
		target.style.transition = 'none';
		target.style.zIndex = 'auto';
	}
	componentWillUnmount() {
		this.refs.grid.removeEventListener("transitionend", this.removeTransition);
	}
	stroeGrid(css) {
		action.storeGrids({
			ele: this.refs.grid,
			x: +css.left.split('px')[0],
			y: +css.top.split('px')[0],
			w: +css.width.split('px')[0],
			h: +css.height.split('px')[0],
		});
	}
	render() {
		return (
			<div ref='grid'
				data-index={this.props.index}
				style={this.dragedDivCss}>
				{this.props.index}
			</div>
		)
	}
}
