import { defineComponent, h } from '@vue/runtime-core';
import StartPageImg from '../../assets/start_page.jpg';
import StartBtn from '../../assets/StartBtn.png';

export default defineComponent({
    setup(props, ctx) {
        // 1、vue3的入口函数
        // 2、没有this
        // 3、return 出来的对象可以挂载到render的ctx上
        const onClick = () => {
            // console.log('点击开始');
            // ctx.emit 子传父
            ctx.emit('changePage', 'GamePage');
        }
        return {
            onClick
        }
    },
    render(ctx) {
        return h('Container', [
            h('Sprite', { texture: StartPageImg }),
            h('Sprite', {
                texture: StartBtn, x: 226, y: 514,
                interactive: true,   //pixi允许点击
                onClick: ctx.onClick
            })
        ])
    }
})