import { game } from '../Game';
import { ref, onMounted, onUnmounted } from '@vue/runtime-core';


/**
 * 键盘移动
 * @param x 初始化 x 坐标值
 * @param y 初始化 y 坐标值
 * @param speed 移动速度
 */
export function useKeyboarMove({ x, y, speed }) {
    let moveX = ref(x);
    let moveY = ref(y);
    // 1、上下、左右类型
    const commandType = {
        upAndDown: 'upAndDown',
        leftAndRight: 'leftAndRight'
    }

    // 2、上、下、左、右属性
    const upCommand = {
        type: commandType.upAndDown,
        dir: -1,
        id: 1
    };
    const downCommand = {
        type: commandType.upAndDown,
        dir: 1,
        id: 2
    };
    const leftCommand = {
        type: commandType.leftAndRight,
        dir: -1,
        id: 3
    };
    const rightCommand = {
        type: commandType.leftAndRight,
        dir: 1,
        id: 4
    };
    // 3、记录数组
    const moveCommands = [];

    // 4、查找上下类型
    const findUpAndDownCommand = () => {
        return moveCommands.find(command => command.type === commandType.upAndDown)
    }

    // 5、查找左右类型
    const findLeftAndRightCommand = () => {
        return moveCommands.find(command => command.type === commandType.leftAndRight)
    }

    // 6、判断数组中是否存在
    const isExistCommand = (command) => {
        const id = command.id;
        return moveCommands.find(key => key.id === id);
    }

    // 7、松开按键移除
    const removeCommand = (command) => {
        const id = command.id;
        const index = moveCommands.findIndex(key => key.id === id);
        moveCommands.splice(index, 1);
    }

    // 8、主循环执行事件
    const handleTicker = () => {
        const upAndDownCommand = findUpAndDownCommand();
        if (upAndDownCommand) {
            moveY.value += speed * upAndDownCommand.dir;
        }

        const leftAndRightCommand = findLeftAndRightCommand();
        if (leftAndRightCommand) {
            moveX.value += speed * leftAndRightCommand.dir;
        }
    }

    const commandMap = {
        ArrowUp: upCommand,
        ArrowDown: downCommand,
        ArrowLeft: leftCommand,
        ArrowRight: rightCommand
    }

    // 9、键盘按下
    const handleKeydown = (e) => {
        const command = commandMap[e.code];
        if (command && !isExistCommand(command)) {
            moveCommands.unshift(command);
        }
    }

    // 10、键盘抬起
    const handleKeyup = (e) => {
        const command = commandMap[e.code];
        if (command) {
            removeCommand(command);
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

    return {
        x: moveX,
        y: moveY
    }
}  