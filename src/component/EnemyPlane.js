import { defineComponent, h, onMounted, onUnmounted, toRefs } from '@vue/runtime-core';
import EnemyImg from '../../assets/enemy.png';
import { enemyLife, enemyAttackInterval } from '../config';

export const EnemyPlaneInfo = {
    width: 308,
    height: 207,
    life: enemyLife //敌方飞机生命值
}

export default defineComponent({
    props: ['x', 'y'],
    setup(props, ctx) {
        let { x, y } = toRefs(props);

        useAttack(ctx, x, y);

        return {
            x, y
        }
    },
    render(ctx) {
        return h('Container', { x: ctx.x, y: ctx.y }, [h('Sprite', { texture: EnemyImg })]);
    }
})

function useAttack({ emit }, x, y) {
    let timer;
    onMounted(() => {
        timer = setInterval(() => {
            emit('attack', {
                x: x.value + 105,
                y: y.value + 190
            })
        }, enemyAttackInterval)
    })
    onUnmounted(() => {
        clearInterval(timer);
    })
}