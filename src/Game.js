
import { Application } from 'pixi.js';
import { stage } from './config';
// 4、setup canvas
export const game = new Application(stage)

// 5、把game加载到页面中
document.body.append(game.view)

// game.stage做为整个根容器
export function getRootContainer() {
    return game.stage
}