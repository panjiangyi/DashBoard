import React,{Component} from 'react';
import { hashHistory } from 'react-router';
import Store from '../flux/store';
export default class BigImage extends Component {
	constructor(o){
		super(o)
	}
	componentWillMount() {
		this.url = this.parseUrl(this.props.params.which);
		console.log('dsfasd')
	}
	componentDidMount() {
		this.images =Store.getState().photoUrls;
		this.imagesLen = this.images.length;
		console.log(this.imagesLen);
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
		console.log('scc',nextProps.params.which)
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
		<table style={{textAlign:'center',position:'fixed',top:'0px',height:'100%',width:'100%',backgroundColor:'rgba(0,0,0,0.2)'}}>
			<tbody>
				<tr>
					<td onClick={this.lastPhoto} style={{width:'10%'}}><img style={{width:'20%'}} src='assets/imgs/forward.png' /></td>
					<td onClick={this.goBack}  style={{width:'80%'}}>
						<img  style={{width:'80%',backgroundColor:'red'}}  src={`http://p1.bqimg.com/588570/${this.url.src}.jpg`} />
					</td>
					<td onClick={this.nextPhoto} style={{width:'10%'}}><img style={{width:'20%'}} src='assets/imgs/next.png' /></td>
				</tr>
			</tbody>
		</table>
		)
	}
}