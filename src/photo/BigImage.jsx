import React,{Component} from 'react';
import { hashHistory } from 'react-router';
import Store from '../flux/store';
import {CircularProgress} from 'material-ui';
import createFragment from 'react-addons-create-fragment';

export default class BigImage extends Component {
	constructor(o){
		super(o)
	  	this.state = {
	  		imgSrc:'',
	  		display:'inline-block',
	  	}
	}
	componentWillMount() {
		this.setState({
	  		imgSrc:``,
			display:'show',
		})
		this.url = this.parseUrl(this.props.params.which);
		this.createImgObj(`http://p1.bqimg.com/588570/${this.url.src}.jpg`);
	}
	createImgObj(url){
		let imgObj = new Image();
		imgObj.src = url;
		imgObj.addEventListener('load',this.computeImg)
	}
	computeImg=(o)=>{
		let target = o.target;
		let ratio = target.width/target.height;
		// console.log(o,this.imgObj);
		this.setState({
	  		imgSrc:`http://p1.bqimg.com/588570/${this.url.src}.jpg`,
			display:'none',
		})
		let bodyWH = this.bodyWindth();
		if(ratio>=1){
			let w = 0.67*bodyWH.w,h = w/ratio;
			this.refs.img.style.width=`${w}px`;
			this.refs.img.style.height=`${h}px`;
		} else {
			let h = 0.75*bodyWH.h,w = h*ratio;
			this.refs.img.style.height=`${h}px`;
			this.refs.img.style.width=`${w}px`;
		}
	}
	bodyWindth(){
		let css = document.defaultView.getComputedStyle(document.body);
		return {
			w:css.width.split('px')[0],
			h:css.height.split('px')[0]
		}
	}
	componentDidMount() {
		this.images =Store.getState().photoUrls;
		this.imagesLen = this.images.length;
	}
	parseUrl(d){
		let arr = d.split('&');
		return {
			src:this.deUrl(arr[0],true),
			index:+arr[1]
		}
	}
	deUrl(d,noS){
	  let srcArr = d.split('/');
	      let len = srcArr.length;
	      srcArr = srcArr[len-1];
	      srcArr = srcArr.split('.');
	      var strArr = srcArr[0].split('');
	      let strLen = strArr.length;
	      noS&&(strArr[strLen-1] = '');
	      return strArr.join('');
	}
	parseStore(d){
		let url = this.deUrl(d,false)
		return url;
	}
	nextPhoto=()=>{
		let i = ++this.url.index;
		if(i>=this.imagesLen){
			i=this.url.index = this.imagesLen-1;
		};
		let url = this.parseStore(this.images[i])
		hashHistory.push(`/photo/img${url}&${i}`);
	}
	componentWillReceiveProps(nextProps) {
		// console.log('scc',nextProps.params.which);
		// setTimeout(this.setImgSrc.bind(this),2000)
	}

	lastPhoto=()=>{
		let i = --this.url.index;
		if(i<0){
			i=this.url.index = 0;
		};
		let url = this.parseStore(this.images[i]);
		hashHistory.push(`/photo/img${url}&${i}`);
	}
	goBack(){
		hashHistory.push(`/photo/`);
	}
	render(){
		return (
		<table style={{textAlign:'center',verticalAlign:'middle',backgroundColor:'rgba(0,0,0,0.2)',position:'fixed',top:'0px',height:'100%',width:'100%'}}>
			<tbody>
				<tr>
					<td onClick={this.lastPhoto} style={{width:'10%'}}><img style={{width:'20%'}} src='assets/imgs/forward.png' /></td>
					<td onClick={this.goBack}  style={{width:'80%'}}>
						<CircularProgress style={{display:this.state.display}} size={260} thickness={7} />
						<img ref='img'    src={this.state.imgSrc} />
					</td>
					<td onClick={this.nextPhoto} style={{width:'10%'}}><img style={{width:'20%'}} src='assets/imgs/next.png' /></td>
				</tr>
			</tbody>
		</table>
		)
	}
}
//<img  style={{width:'80%',backgroundColor:'red'}}  src={`http://p1.bqimg.com/588570/${this.url.src}.jpg`} />