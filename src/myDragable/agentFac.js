import initMap from './initMap';
import Tools from './Tools';
let oldAgentXY = { ele: null, x: 0, y: 0, w: 0, h: 0 };
let agent = null;
export default class Tool {
    static start(pos) {
        //this是agent
        oldAgentXY.ele = pos.ele;
        oldAgentXY.x =pos.x; 
        oldAgentXY.y =pos.y;
        oldAgentXY.w = pos.w;
        oldAgentXY.h = pos.h;
        this.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        this.style.width = pos.w + 'px';
        this.style.height = pos.h + 'px';
        this.style.display = 'block';
        // this.style.zIndex = '500';
        agent = this;
    }
    static dragging(x, y) {
        //this是被拖动的方块
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
        Tools.disable(this)


        // console.log('---------start-------------')
        Tools.trig(oldAgentXY,'start')
        // console.log('---------middle-------------')
        Tools.trig(agentPos,'end')
        //  console.log('----------end------------')
        // console.log(oldAgentXY,agentPos)
        oldAgentXY.x = agentPos.x;
        oldAgentXY.y = agentPos.y;
        oldAgentXY.ele = agentPos.ele;
    }
    static end() {
        agent.style.display = 'none';
        // agent.style.zIndex = 'auto';
        return oldAgentXY;
    }
}

