import { defineComponent, h } from '@vue/runtime-core';
import EndPageImg from '../../assets/end_page.jpg';
import RestartBtnImg from '../../assets/restartBtn.png';

export default defineComponent({
    setup(props, ctx) {
        const onClick = () => {
            ctx.emit('changePage', 'GamePage')
        }
        return {
            onClick
        }
    },
    render(ctx) {
        return h('Container', [
            h('Sprite', { texture: EndPageImg }),
            h('Sprite', {
                texture: RestartBtnImg, x: 226, y: 514,
                interactive: true, //pixi允许点击
                onClick: ctx.onClick
            }),
        ])
    }
})