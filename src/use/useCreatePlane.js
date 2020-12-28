import { reactive, onMounted, onUnmounted } from '@vue/runtime-core';
import { useKeyboarMove } from '../use/useKeyboarMove';
import TWEEN from '@tweenjs/tween.js';  //动画库
import { game } from "../Game";
import { EnemyPlaneInfo } from '../component/EnemyPlane';
import { stage, createEnemyInterval } from '../config';


// 我方飞机的逻辑
export function useCreatePlane({ x, y, speed }) {
    // reacitve 用来创建响应式对象，对应引用类型，与ref区分
    let selfPlane = reactive({ x, y, speed, width: 258, height: 364 });

    let { x: selfPlaneX, y: selfPlaneY } = useKeyboarMove({ x, y, speed }); //优化按键平

    // 键盘控制飞机移动
    // window.addEventListener('keydown', (e) => {
    //     // console.log(e);
    //     switch (e.code) {
    //         case 'ArrowUp':
    //             planeInfo.y -= speed;
    //             break;
    //         case 'ArrowDown':
    //             planeInfo.y += speed;
    //             break;
    //         case 'ArrowLeft':
    //             planeInfo.x -= speed;
    //             break;
    //         case 'ArrowRight':
    //             planeInfo.x += speed;
    //             break;
    //     }
    // })

    // 缓动出场
    var tween = new TWEEN.Tween({
        x,
        y,
    })
        .to({ y: y - 250 }, 500)
        .start();
    tween.onUpdate((obj) => {
        selfPlane.x = obj.x;
        selfPlane.y = obj.y;
    });

    const handleTicker = () => {
        TWEEN.update();
    };

    onUnmounted(() => {
        game.ticker.remove(handleTicker);
    });

    onMounted(() => {
        game.ticker.add(handleTicker);
    });

    selfPlane.x = selfPlaneX;
    selfPlane.y = selfPlaneY;
    // console.log(planeInfo);
    return selfPlane
}

// 敌方飞机
export function useCreateEnemyPlanes() {
    const createEnemyPlane = (x) => {
        return Object.assign({ x, y: 0 }, EnemyPlaneInfo);
    }

    let enemyPlanes = reactive([]);

    setInterval(() => {
        let x = Math.floor(stage.width * Math.random());
        enemyPlanes.push(createEnemyPlane(x));
    }, createEnemyInterval)
    return enemyPlanes
}