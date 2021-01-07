import { watch } from 'chokidar'
import { PluginOption, ChokidarEvent, ChokidarPluginFileEvent } from './types'

class ChokidarPlugin {
  options: PluginOption
  PluginName: string
  listening: boolean

  constructor(options: PluginOption) {
    this.PluginName = 'ChokidarPlugin'
    this.options = options
    this.listening = false
  }

  apply(compiler: any) {
    compiler.hooks.watchRun.tapAsync(
      this.PluginName,
      (compilation: any, callback: any) => {
        if (this.listening) return callback()

        const { chokidarConfigList = [] } = this.options

        for (let { file, opt, actions } of chokidarConfigList) {
          // ignore watch when no actions provide
          if (!actions || !Object.keys(actions).length) continue

          // create watch instance
          const watcher = watch(file, opt)

          // add listener
          Object.entries(actions).forEach((action) => {
            const [listen, cbs]: [
              keyof ChokidarEvent,
              Partial<ChokidarPluginFileEvent>
            ] = action as any

            Object.entries(cbs).forEach(([name, cb]) =>
              watcher![listen](name, (...args) =>
                (cb as any)!({ compiler, compilation, watcher }, ...args)
              )
            )
          })
        }

        this.listening = true

        callback()
      }
    )
  }
}

module.exports = ChokidarPlugin
