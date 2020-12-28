// console.log('Grayly,你好帅');
import { createApp } from './src/runtime-canvas';
import App from './src/App';
import { getRootContainer } from './src/Game'

// import * as PIXI from 'pixi.js';
// console.log(PIXI);

// 1、需要根组件
// 2、需要根容器
// 3、就挂载到canvas --> pixi.js
createApp(App).mount(getRootContainer());