/**
 * 碰撞检测算法
 * @param {Object} objA 
 * @param {Object} objB
 * @returns {Boolean}
 */
export function fitTestObject(objA, objB) {
    // 矩形碰撞
    // 找出所有没有碰撞上的结果
    // 取反就是碰撞
    return objA.x + objA.width >= objB.x &&
        objB.x + objB.width >= objA.x &&
        objA.y + objA.height >= objB.y &&
        objB.y + objB.height >= objA.y
}