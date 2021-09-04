import { FSWatcher, watch } from 'chokidar'
import { Chokidar } from './types'

export default function (config: Chokidar): Promise<FSWatcher[]> {
  const { options: watchOptions, list } = config

  return new Promise((resolve, reject) => {

    const watchers = list.map(({ target, options, watch: watchEvent }) => {

      // reject when no watchEvent provide
      if (!watchEvent || !Object.keys(watchEvent).length) {
        reject('Please provide actions option')
      }

      // create watch instance
      const watcher = watch(target, Object.assign({}, watchOptions, options))

      // add listener
      Object.entries(watchEvent).forEach(([name, cb]) => watcher.on(name, (...args) => (cb as any)(watcher, ...args)))

      return watcher
    })

    resolve(watchers)
  })
}
