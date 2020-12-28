import { onMounted, onUnmounted } from "@vue/runtime-core";
import { game } from "../Game";

/**
 * 
 * @param {function} emit 子传父方法
 * @param {Object} x 横坐标
 * @param {Object} y 纵坐标
 */
export const useAttackHandle = (emit, x, y) => {
    let isAttack = false;   //是否攻击
    let attackInterval = 10;
    let startTime = 0;
    const startAttack = () => {
        isAttack = true;
        startTime = 100;
    }
    const stopAttack = () => isAttack = false;
    const command = {
        Space: {
            keydown: startAttack,
            keyup: stopAttack
        }
    }

    const handleTicker = () => {
        if (isAttack) {
            startTime++;
            if (startTime > attackInterval) {
                startTime = 0;
                emit('attack', {
                    x: x.value + 100,
                    y: y.value
                })
            }
        }
    }
    const handleKeydown = (e) => {
        let callBackObj = command[e.code]
        if (callBackObj) {
            callBackObj.keydown();
        }
    }
    const handleKeyup = (e) => {
        let callBackObj = command[e.code]
        if (callBackObj) {
            callBackObj.keyup();
        }
    }

    onMounted(() => {
        game.ticker.add(handleTicker);
        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keyup', handleKeyup);
    })
    onUnmounted(() => {
        game.ticker.remove(handleTicker);
        window.removeEventListener('keydown', handleKeydown);
        window.removeEventListener('keyup', handleKeyup);
    })
}