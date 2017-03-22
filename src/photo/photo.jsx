import React,{Component} from 'react';
import _ from 'lodash';
import {Responsive, WidthProvider} from 'react-grid-layout';
import PhotoCard from './PhotoCard.jsx';
import { hashHistory } from 'react-router'
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import Store from '../flux/store';
import fluxConstants from '../flux/constants';
import action from '../flux/action';
export default class ShowcaseLayout extends Component {

  static defaultProps = {
    className: "layo1ut",
    rowHeight: 23,
    cols: {lg: 15, md: 12, sm: 9, xs: 6, xxs: 3},
    colNum: {lg: 5, md: 4, sm: 3, xs: 2, xxs: 1},
  };

  state = {
    layouts: {lg: generateLayout(9,5)},
    images:[

    ]
  };

  componentDidMount() {
    this.storeSubscription = Store.addListener(fluxConstants.PHOTO_URL,e => this.getPhotoUrls(e));
    action.getPhotoUrl();
  }
  componentWillUnmount() {
    this.storeSubscription.remove();
  }
  getPhotoUrls(){
     this.setState({
      images:Store.getState().photoUrls
     })
  }
  generateDOM() {
    return _.map(this.state.images, function (path, i) {
      return (
        <div style={{backgroundColor:'grey'}} key={i} >
          <PhotoCard imgPath={path} index={i} />
        </div>);
    });
  }
  onBreakpointChange = (layout) => {
    // console.log(layout)
    this.setState({
      layouts: {lg: generateLayout(9,ShowcaseLayout.defaultProps.colNum[layout])},
    });
  }
  watchBigImages(e){
    // browserHistory.push(`/img${74add1d3828de6f2s}`)
    let target = e.target;
    let src  = target.getAttribute('data-src'),
    index = target.getAttribute('data-index');
    if(src){
      let srcArr = src.split('/');
      let len = srcArr.length;
      srcArr = srcArr[len-1];
      srcArr = srcArr.split('.');
      var strArr = srcArr[0].split('');
      let strLen = strArr.length;
      // strArr[strLen-1] = '';
        hashHistory.push(`/photo/img${strArr.join('')}&${index}`);
      }
  }

  render() {
    return (
      <div style={{position:'relative'}} onClick={this.watchBigImages}>        
        <ResponsiveReactGridLayout
          {...this.props}
          onBreakpointChange={this.onBreakpointChange}
          layouts={this.state.layouts}
          measureBeforeMount={true}
          useCSSTransforms={true}>
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
            {this.props.children&&React.cloneElement(this.props.children, {
                  key: this.props.location.pathname
                })}  
      </div>
    );
  }
}


function generateLayout(num,col) {
  // console.log(num,col)
  return _.map(_.range(0, num), function (item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (i%col)*3,
      y: Math.floor(i/col),
      w: 3,
      h: 13,
      i: i.toString(),
      static:false
    };
  });
}
