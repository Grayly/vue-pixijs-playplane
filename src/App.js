// 根组件
import { computed, ref, defineComponent, h } from '@vue/runtime-core';
import Cirlcle from './component/Circle';
import StartPage from './page/StartPage';
import GamePage from './page/GamePage';
import EndPage from './page/EndPage';

export default defineComponent({
    setup(props, ctx) {
        // ref 用来创建响应式对象，对应值类型
        let currentPageName = ref('StartPage');
        // let currentPageName = ref('GamePage');
        // let currentPageName = ref('EndPage');

        // computed 计算属性
        let currentPage = computed(() => {
            if (currentPageName.value === 'StartPage') {
                return StartPage
            } else if (currentPageName.value === 'GamePage') {
                return GamePage
            } else {
                return EndPage
            }
        })
        return {
            currentPageName,
            currentPage
        }
    },
    render(ctx) {
        // 创建vnode 虚拟节点
        // const vnode = h("rect", { x: 100, y: 100 }, 'Grayly最帅'); -->   <rect x=100 y=100>Grayly最帅</rect>
        // const vnode = h("rect", { x: 100, y: 100 }, 'Grayly最帅');

        // const vnode = h("rect", { x: 100, y: 100 }, ['Grayly最帅', h("circle", { x: 100, y: 100 })]); -->   <rect x=100 y=100>Grayly最帅<circle></circle></rect>
        // const vnode = h("rect", { x: 100, y: 100 }, ['Grayly最帅', h("circle", { x: 100, y: 100 })]);
        // const vnode = h("rect", { x: 100, y: 100 }, ['Grayly最帅', h(Cirlcle)]);
        // console.log(vnode);
        const vnode = h('Container', [h(ctx.currentPage, {
            onChangePage(page) {
                // console.log(page);
                // 不需要 .value ,因为在render或者template中自动帮你解构对应
                ctx.currentPageName = page;
            }
        })])
        // const vnode = h('Container', [h(GamePage)])
        return vnode;
    }
})