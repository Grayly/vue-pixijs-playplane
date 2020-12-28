import { defineComponent, h } from '@vue/runtime-core';
import Map from '../component/Map';
import Plane from '../component/Plane';
import EnemyPlane from '../component/EnemyPlane';
import Bullet from '../component/Bullet';
import { useCreatePlane, useCreateEnemyPlanes } from '../use/useCreatePlane';
import { useCreateBullets, useEnemyPlaneBullets } from '../use/useCreateBullets';
import { useFighting } from '../use/useFighting';
import { stage, selfSpeed } from '../config';

export default defineComponent({
    setup(props, ctx) {
        // 我方飞机
        let planeInfo = useCreatePlane({
            x: stage.width / 2 - 60,
            y: stage.height,
            speed: selfSpeed
        });

        // 敌方飞机
        let enemyPlanes = useCreateEnemyPlanes();

        // 构建子弹
        let { bullets, addBullet } = useCreateBullets();

        // 构建敌方子弹
        let { enemyBullets, createEnemyBullet } = useEnemyPlaneBullets();

        // 飞机空格事件发射子弹
        const onAttack = (bulletInfo) => {
            addBullet(bulletInfo)
        }

        useFighting(enemyPlanes, bullets, enemyBullets, planeInfo, ctx.emit)

        return {
            planeInfo,
            enemyPlanes,
            bullets,
            enemyBullets,
            onAttack,
            createEnemyBullet
        }
    },


    render(ctx) {
        // 创建敌军飞机
        const createEnemyPlanes = () => {
            return ctx.enemyPlanes.map(info => {
                return h(EnemyPlane, {
                    x: info.x, y: info.y,
                    onAttack({ x, y }) {
                        ctx.createEnemyBullet(x, y);
                    }
                })
            })
        };

        // 创建我方子弹
        const createBullets = () => {
            return ctx.bullets.map(info => {
                return h(Bullet, { x: info.x, y: info.y, dir: info.dir })
            })
        }

        // 创建敌方子弹
        const createEnemyBullets = () => {
            return ctx.enemyBullets.map(info => {
                return h(Bullet, { x: info.x, y: info.y, dir: info.dir })
            })
        }

        return h('Container', [
            h(Map),
            h(Plane, { x: ctx.planeInfo.x, y: ctx.planeInfo.y, onAttack: ctx.onAttack }),
            createEnemyPlanes(),
            createBullets(),
            createEnemyBullets()
        ])
    }
})
