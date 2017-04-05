import React, { Component } from 'react';
import action from '../flux/action';
import Tools from './Tools';
import { addRelListener, addHomeListener } from './event';
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
			touchAction: 'none',
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
	}
	getRel = () => {
		let target = this.refs.grid;
		let nodeInfo = Tools.getGridCss.call(target)
		let rels = Tools.gridRels(nodeInfo);
		let upDn = {
			beyond: rels.beyond,
			below: rels.below,
		}
		action.StoreRels(upDn, this.props.index);
	}
	move = () => {
		let grid = this.refs.grid;
		let nodeinfo = Tools.getGridCss.call(grid)
		let beyondRels = Tools.getAllRel(nodeinfo, 'beyond');
		console.log(`${this.props.index}:`, beyondRels)
		let dis = 10;
		for (let i = 0; i < beyondRels.length; i++) {
			let nodeinfo = Tools.getGridCss.call(beyondRels[i]);
			let nodeBottom = nodeinfo.y + nodeinfo.h+10
			dis = dis > nodeBottom ? dis : nodeBottom;
		}
		Object.assign(nodeinfo, {
			y: dis
		})
		grid.style.transition = 'all 0.5s ease';
		grid.style.transform = `translate(${nodeinfo.x}px, ${dis}px)`;
		action.modifyStoredGrids(nodeinfo);
		action.saveGridStates({
			x: nodeinfo.x,
			y: nodeinfo.y
		}, grid.getAttribute('data-index'));
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
