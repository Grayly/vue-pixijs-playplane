import { onMounted, onUnmounted } from '@vue/runtime-core';
import { fitTestObject } from '../utils';
import { game } from '../Game';
import { moveEnemyPlane } from '../utils/moveEnemyPlane';
import { moveBullets } from '../utils/moveBullets';

/**
 * 战斗逻辑
 * @param {Object} 敌方飞机
 * @param {Object} 我方子弹
 * @param {Object} 敌方子弹
 * @param {Object} 我方飞机
 * @param {function} 子传父方法
 */
export function useFighting(enemyPlanes, bullets, enemyBullets, planeInfo, emit) {

    // 主循环
    let handleTicker = () => {

        // 子弹移动
        moveBullets(bullets);
        moveBullets(enemyBullets);
        // 敌方飞机移动
        moveEnemyPlane(enemyPlanes);

        // 子弹移动
        bullets.forEach((bulletInfo, bulleIndex) => {
            // bulletInfo.y--
            // 我方子弹和敌方飞机碰撞检测
            enemyPlanes.forEach((enemyInfo, enemyIndex) => {
                if (fitTestObject(bulletInfo, enemyInfo)) {
                    bullets.splice(bulleIndex, 1);
                    enemyInfo.life--;//敌方飞机减血
                    if (enemyInfo.life === 0) {
                        enemyPlanes.splice(enemyIndex, 1);
                    }
                }
            })
            // 我方子弹和敌方子弹碰撞检测
            enemyBullets.forEach((enemyBullet, enemyBulletIndex) => {
                if (fitTestObject(enemyBullet, bulletInfo)) {
                    bullets.splice(bulleIndex, 1);
                    enemyBullets.splice(enemyBulletIndex, 1);
                }
            })
        })

        // 游戏结束
        const hitSelfPlaneHandle = (enemy) => {
            if (fitTestObject(enemy, planeInfo)) {
                // console.log('游戏结束');
                emit('changePage', 'EndPage');
            }
        }
        // 敌我飞机碰撞
        enemyPlanes.forEach(enemyInfo => {
            hitSelfPlaneHandle(enemyInfo);
        })
        // 敌方子弹碰撞我方飞机
        enemyBullets.forEach(enemyInfo => {
            hitSelfPlaneHandle(enemyInfo);
        })
    }

    // 生命周期
    onMounted(() => {
        game.ticker.add(handleTicker)
    })
    onUnmounted(() => {
        game.ticker.remove(handleTicker)
    })
}