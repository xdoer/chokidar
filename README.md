# webpack-plugin-chokidar

可以让 webpack 监听不处于依赖图中的文件的变动。

## 简介

众所周知，Webpack 只能监听处于文件依赖图的文件的变动，当新建一个文件时，是没有办法监听到的。

`webpack-plugin-chokidar` 是一个可以让 Webpack 可以监听不处于依赖图中的文件的变动，通过回调函数，你可以做任何你想做的事情。它集成了[chokidar](https://github.com/paulmillr/chokidar)，使用时只需要传入一份配置即可。

## 案例

使用该插件，可以实现类似 [umi](https://umijs.org/zh-CN/docs/convention-routing)约定式路由的设计。在监听到文件创建时，运行修改路由文件脚本，可触发 webpack 重新编译。

我在 Taro 小程序中，配合该插件实现了 umi 约定式路由的功能[generated-plugin-taro-router-service](https://github.com/LuckyHH/generated-plugin-taro-router-service)。

## 使用示例

```js
new WebPackPluginChokidar({
  chokidarConfigList: [
    {
      file: '../src/pages/**/index.tsx',
      opt: { persistent: true, ignoreInitial: true },
      actions: {
        on: {
          add: ({ compiler, compilation, watcher }, path) => {
            console.log(`File ${path} has been added`);
          },
        },
      },
    },
  ],
});
```

## 配置

插件只需要传入一个 `chokidarConfigList` 配置项即可，该配置项是列表。

列表中每一项包含三个字段

>* file。要监听的文件或文件夹
>* opt。监听配置项
>* actions。事件集

对应 chokidar 中的 `chokidar.watch(file, opt)`

actions 中定义了 chokidar 的事件集合。包括 `on`，`close`，`add`，`unwatch` 和 `getWatched`。

`on` 事件中，你可以监听到文件、文件夹的创建、删除，变更等等操作。

你可以查看[类型文件](./src/types.ts)，和[chokidar](https://github.com/paulmillr/chokidar)文档获取更多使用方式。
