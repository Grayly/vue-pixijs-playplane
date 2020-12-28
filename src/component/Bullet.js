import { defineComponent, h, toRefs } from '@vue/runtime-core';
import SelfBulletImg from '../../assets/bunny-self.png';
import EnemyBulletIg from '../../assets/bunny.png';

const BulletInfo = {
    width: 61,
    height: 99
}

export const SelfBulletInfo = Object.assign({ dir: -1 }, BulletInfo);
export const EnemyBulletInfo = Object.assign({ dir: 1 }, BulletInfo);

export default defineComponent({
    props: ['x', 'y', 'dir'],
    setup(props, ctx) {
        let { x, y, dir } = toRefs(props);
        return { x, y, dir }
    },
    render(ctx) {
        return h('Sprite', {
            x: ctx.x, y: ctx.y,
            texture: ctx.dir === 1 ? EnemyBulletIg : SelfBulletImg
        })
    }
})