import { reactive } from '@vue/runtime-core';
import { SelfBulletInfo, EnemyBulletInfo } from '../component/Bullet';

// 我方子弹
export function useCreateBullets() {
    let bullets = reactive([]);

    const addBullet = (bulletInfo) => {
        bullets.push(Object.assign(bulletInfo, SelfBulletInfo))
    }
    return { bullets, addBullet };
}

// 敌方子弹
export function useEnemyPlaneBullets() {
    let enemyBullets = reactive([]);

    let enemyBulletId = 1;

    const createEnemyBullet = (x, y) => {
        let obj = { x, y, id: enemyBulletId++ };
        enemyBullets.push(Object.assign(obj, EnemyBulletInfo));
    }
    return { enemyBullets, createEnemyBullet }
}
