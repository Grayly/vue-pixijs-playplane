# 打飞机小游戏
# vue-pixijs-playplane

使用 vue3 的语法来开发 pixijs 

[查看页面：index.html](https://grayly.github.io/vue-pixijs-playplane/dist/index.html)

## 实现原理

实现了自定义的 vue Renderer ，渲染使用 pixijs 


## why
1. 需求驱动学习 vue3 + pixijs
2. 以开发小游戏的形式去完善 Renderer

## 启动

1. 先启动服务

```shell
yarn serve
```

2. 访问 http://localhost:666


## 构建
```shel
yarn build
```

## tasking

- [x] 地图可滚动
  - [x] 逻辑实现：两张地图循环播放
  - [x] 素材
- [x] 开始页面
- [x] 结束页面
- [ ] 战斗
  - [ ] 敌机
    - [x] 3秒创建一个敌机
    - [x] 从上往下移动
    - [x] 移动的方向随机变换
        - [x] 不允许移动超过地图边界
    - [x] 可以发射炮弹
      - [x] 超出屏幕过，销毁炮弹
      - [x] 超出屏幕过，销毁敌方飞机
    - [x] 被击中 3 次就要爆炸掉
      <!-- - [ ] 销毁之前播放爆炸动画 -->
  - [ ] 我方战机
    - [x] 碰到敌机子弹的话会直接死亡跳转到游戏结束页面
    - [x] 我方子弹碰到地方子弹的话，双方子弹都消失

- [ ] 优化
  - [x] 飞机移动不流畅
  - [x] 我方飞机发射子弹不流畅
  - [x] 刚进战斗时，飞机应该自己飞出来
