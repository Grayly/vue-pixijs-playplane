import { createRenderer } from '@vue/runtime-core';
import { Container, Graphics, Sprite, Text, Texture } from 'pixi.js';

const renderer = new createRenderer({
    createElement(type) {
        let element;
        // if (type === 'rect') {
        //     //  创建一个矩形
        //     element = new Graphics();
        //     element.beginFill(0xFFFF00);    //红色(windows色彩)
        //     element.drawRect(0, 0, 500, 500);   //矩形
        //     element.endFill();//结束绘制 
        //     return element;
        // } else if (type === 'circle') {
        //     // 创建一个圆形
        //     element = new Graphics();
        //     element.beginFill(0xFFF00);    //红色(windows色彩)
        //     element.drawCircle(0, 0, 50);   //圆
        //     element.endFill();//结束绘制 
        //     return element;
        // }
        // console.log(type); div
        switch (type) {
            case 'Container':
                element = new Container();
                break;
            case 'Sprite':
                element = new Sprite();
                break;
            default:
                break;
        }
        return element;
    },
    setElementText(node, text) {
        const cText = new Text(text); //创建文本
        node.addChild(cText);
    },
    createText(text) {
        return new Text(text);
    },
    patchProp(el, key, prevValue, nextValue) {
        // console.log(el, key, nextValue);
        // el[key] = nextValue;
        switch (key) {
            case 'texture':
                el.texture = Texture.from(nextValue)
                break;
            case 'onClick':
                el.on("pointertap", nextValue);
                break;
            default:
                el[key] = nextValue;
                break;
        }
    },
    insert(el, parent) {
        // console.log(el); //由createElement返回
        // console.log(parent); Container -->由pixijs创建
        parent.addChild(el);
    },
    createComment() { },
    // 获取父节点
    parentNode() { },
    // 获取兄弟节点
    nextSibling() { },
    // 删除节点时调用
    remove(el) {
        const parent = el.parent;
        if (parent) {
            parent.removeChild(el);
        }
    }
});

export function createApp(rootComponent) {
    return renderer.createApp(rootComponent);
}