import { stage, enemySpeedX, enemySpeedY } from '../config';
/**
 * 敌方飞机移动
 * @param enemyPlanes
 */
export const moveEnemyPlane = (enemyPlanes) => {
    enemyPlanes.forEach((enemyPlane, index) => {
        if (!enemyPlane.moveInfo) {
            // 创建移动信息
            enemyPlane.moveInfo = {
                dir: 1,//移动方向
                count: 0  //多久开始改变方向
            };
        }
        enemyPlane.x += enemySpeedX * enemyPlane.moveInfo.dir;
        enemyPlane.y += enemySpeedY;
        enemyPlane.moveInfo.count++;
        if (enemyPlane.moveInfo.count > 168) {
            // 随机转向
            enemyPlane.moveInfo.dir = Math.random() > 0.5 ? 1 : -1;
            enemyPlane.moveInfo.count = 0;
        }

        // 检测是否碰到边界, 碰到反弹
        if (isArrivedLeftBorder(enemyPlane)) {
            // enemyPlane.x = 0;
            enemyPlane.moveInfo.dir = 1;
        }
        if (isArrivedRightBorder(enemyPlane)) {
            // enemyPlane.x = stage.width - enemyPlane.width;

            enemyPlane.moveInfo.dir = -1;
        }

        if (enemyPlane.y > stage.height + enemyPlane.height) {
            enemyPlanes.splice(index, 1)
        }
    });
}

function isArrivedLeftBorder(enemyPlane) {
    return enemyPlane.x <= 0;
}

function isArrivedRightBorder(enemyPlane) {
    return enemyPlane.x + enemyPlane.width >= stage.width;
}