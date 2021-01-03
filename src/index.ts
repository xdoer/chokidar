const chokidar = require('chokidar');

class ChokidarPlugin {

  options: any

  constructor(options: any) {
    this.options = options
  }

  apply(compiler: any) {

    compiler.hooks.done.tapAsync('ChokidarPlugin', (compilation: any, callback: any) => {

      const { chokidarConfigList = [] } = this.options

      chokidarConfigList.forEach((item: any) => {
        const { file, opt, actions = {} } = item

        const watcher = chokidar.watch(file, opt)

        Object.entries(actions).forEach(([listen, cbs]) => {
          Object.entries(cbs as any).forEach(([name, cb]) => {
            watcher[listen](name, (...args: any) => (cb as any)({ compiler, compilation, watcher }, ...args))
          })
        })
      })

      callback();
    });
  }
}

module.exports = ChokidarPlugin;
