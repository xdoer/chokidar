# webpack-plugin-chokidar

可以让 webpack 监听不处于依赖图中的文件的变动。

## 前言

使用过 umi 框架的人一定对其**约定式路由**功能印象深刻，你只需要在 `page` 文件夹下新建文件，无需任何配置，在另一个页面就可以直接进行跳转。实现原理其实很简单，只需要监听 `page` 文件夹下的文件新增和删除，运行脚本更新路由表文件即可。

但众所周知，Webpack 只能监听处于文件依赖图的文件的变动，当对一个不处于依赖图中的文件进行新建/修改/删除等操作时，是没有办法监听到的。

`webpack-plugin-chokidar` 是一个可以让 Webpack 可以监听不处于依赖图中的文件的变动，在回调函数中，你可以执行你的自动化脚本。它整合了[chokidar](https://github.com/paulmillr/chokidar)，重新设计了其 API，使用时只需要传入一份配置即可。

## 安装

```bash
npm i webpack-plugin-chokidar -D
```

## 配置

| 配置项  | 类型                          | 对应                                                           | 含义                       |
| ------- | ----------------------------- | -------------------------------------------------------------- | -------------------------- |
| file    | string                        | chokidar.watch(**file**, opt)                                  | 要监听的文件，文件夹，glob |
| opt     | [WatchOptions](src/types.ts)  | chokidar.watch(file, **opt**)                                  | 监听选项                   |
| actions | [ChokidarEvent](src/types.ts) | watcher['on' \| 'close' \| 'add' \| 'unwatch' \| 'getWatched'] | 监听回调函数               |

你可以查看[类型文件](./src/types.ts)和[chokidar](https://github.com/paulmillr/chokidar#api)文档查看更详细的配置

## 使用示例

下面演示一个简单的案例。当监听到 dist 目录有文件变化时，自动上传文件到远程服务器。

```js
const shell = require('shelljs')
const debounce = require('lodash.debounce')
const path = require('path')

const uploadFileToRemote = debounce(() => {
  const dirPath = path.resolve(__dirname, '../dist')
  shell.exec(
    `sshpass -p "test12345" scp -r ${dirPath} acm@192.168.1.1:/Users/acm/Desktop/spider`
  )
}, 1000)

// ...some webpack code

new WebPackPluginChokidar({
  chokidarConfigList: [
    {
      file: '../dist/*',
      opt: { persistent: true, ignoreInitial: true },
      actions: {
        on: {
          change: ({ compiler, compilation, watcher }, path) => {
            uploadFileToRemote()
          },
        },
      },
    },
  ],
})
```

## 案例

[generated-plugin-taro-router-service](https://github.com/LuckyHH/generated-plugin-taro-router-service)。
