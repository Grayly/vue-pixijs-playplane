import { defineComponent, h, watch, reactive, toRefs } from '@vue/runtime-core';
import Plane from '../../assets/plane.png';
import { useAttackHandle } from '../use/useAttackHandle';

export default defineComponent({
    props: ['x', 'y'],  //接受父组件传递的参数
    setup(props, ctx) {
        // console.log(props);
        // props 只是一个只读的响应式对象

        // 方案一
        // let point = reactive({ x: props.x, y: props.y })
        // watch(props, (value) => {
        //     point.x = value.x;
        //     point.y = value.y;
        //     // console.log(point);
        // })
        // return {
        //     point
        // }

        // 方案二
        // 通过toRefs解决响应式丢失
        let { x, y } = toRefs(props);
        // 子弹攻击
        // window.addEventListener('keydown', (e) => {
        //     if (e.code === 'Space') {
        //         ctx.emit('attack', {
        //             x: x.value + 100,
        //             y: y.value
        //         })
        //     }
        // })

        useAttackHandle(ctx.emit, x, y);

        return {
            x: x,
            y: y
        }
    },
    render(ctx) {
        // return h('Container', { x: ctx.point.x, y: ctx.point.y }, [h('Sprite', { texture: Plane })])
        return h('Container', { x: ctx.x, y: ctx.y }, [h('Sprite', { texture: Plane })])
    }
})