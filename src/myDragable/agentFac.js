import initMap from './initMap';
import Tools from './Tools';
import { trigger } from './event';
import action from './../flux/action';
let oldAgentXY = { ele: null, x: 0, y: 0, w: 0, h: 0 };
let agent = null;
export default class Tool {
    static start(pos) {
        oldAgentXY.w = pos.w;
        oldAgentXY.h = pos.h;
        this.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        this.style.width = pos.w + 'px';
        this.style.height = pos.h + 'px';
        this.style.display = 'block';
        agent = this;
    }
    static dragging(x, y) {
        let agentPos = initMap.whereToDrop({
            ele: this,
            x: x,
            y: y,
            w: oldAgentXY.w,
            h: oldAgentXY.h
        })
        if (oldAgentXY.x === agentPos.x && oldAgentXY.y === agentPos.y) {
            return
        }
        // console.log(Tools.getAllRel(agentPos,'below'))
        agent.style.transform = `translate(${agentPos.x}px, ${agentPos.y}px)`;
        disable(this)


        // console.log('---------start-------------')
        trig(oldAgentXY)
        // console.log('---------middle-------------')
        trig(agentPos)
        //  console.log('----------end------------')
        // console.log(oldAgentXY,agentPos)
        oldAgentXY.x = agentPos.x;
        oldAgentXY.y = agentPos.y;
        oldAgentXY.ele = agentPos.ele;
    }
    static end(currentEle) {
        able(currentEle)
        agent.style.display = 'none';
        return oldAgentXY;
    }
}
function trig(nodeInfo, node) {
    let eleArr = Tools.getAllRel(nodeInfo, 'below');
    let iArr = [];
    eleArr.sort((a, b) => {
        let cssa = Tools.getGridCss.call(a);
        let cssb = Tools.getGridCss.call(b)
        return cssa.y - cssb.y
    })
    eleArr.forEach(function (d, i) {
        let index = d.getAttribute('data-index');
        iArr.push(index)
    })
    trigger(iArr, node);
}

//使被拖动方块不存在与rel中
function disable(ele){
    action.modifyStoredGrids({
        ele:ele,
        x:-100,
        y:-100,
        w:0,
        h:0,
    })
}
function able(ele){
    let nodeinfo =Tools.getGridCss.call(ele);
        action.modifyStoredGrids(nodeinfo)
}