# Chokidar

This is based on [paulmillr](https://github.com/paulmillr)' [chokidar](https://github.com/paulmillr/chokidar) project which make it easier to use.

## Install

```bash
yarn add @xdoer/chokidar
```

## Example

```ts
import chokidar from '@xdoer/chokidar'

chokidar({
  options: { persistent: true, ignoreInitial: true },
  list: [
    {
      target: '../dist/*',
      options: { ignoreInitial: false },
      watch: {
        add(watcher, path) {
          // do something
        },
        change(watcher, path) {
          // do something
        },
        // ...
      },
    },
    {
      target: ['**/src/demo/**', '**/src/api/**'],
      options: { ignoreInitial: false },
      watch: {
        add(watcher, path) {
          // do something
        },
        change(watcher, path) {
          // do something
        },
        // ...
      },
    },
  ],
})
```

## Options

### Main Options

| Option  | Type                                                  | Mapping                             | Meaning            |
| ------- | ----------------------------------------------------- | ----------------------------------- | ------------------ |
| options | [WatchOptions](https://github.com/paulmillr/chokidar) | chokidar.watch(target, **options**) | main watch options |
| list    | ChokidarOption[]                                      |                                     | watch list         |

### ChokidarOption

| Option  | Type                                                  | Mapping                             | Meaning                           |
| ------- | ----------------------------------------------------- | ----------------------------------- | --------------------------------- |
| target  | string \| string[]                                    | chokidar.watch(**target**, options) | The file or dir you want to watch |
| options | [WatchOptions](https://github.com/paulmillr/chokidar) | chokidar.watch(target, **options**) | watch options                     |
| watch   | ChokidarWatchEvent                                    | chokidar.watch().on                 | watch().on callback               |

### ChokidarWatchEvent

| Option    | Type                                                                             | Mapping                                        |
| --------- | -------------------------------------------------------------------------------- | ---------------------------------------------- |
| ready     | (watcher: FSWatcher) => void                                                     | chokidar.watch().on('ready', **callback**)     |
| add       | (watcher: FSWatcher, path: string, status?: Stats) => void                       | chokidar.watch().on('add', **callback**)       |
| addDir    | (watcher: FSWatcher, path: string, status?: Stats) => void                       | chokidar.watch().on('addDir', **callback**)    |
| change    | (watcher: FSWatcher, path: string, status?: Stats) => void                       | chokidar.watch().on('change', **callback**)    |
| unlink    | (watcher: FSWatcher, path: string, status?: Stats) => void                       | chokidar.watch().on('unlink', **callback**)    |
| unlinkDir | (watcher: FSWatcher, path: string, status?: Stats) => void                       | chokidar.watch().on('unlinkDir', **callback**) |
| raw       | (watcher: FSWatcher, eventName: string, path: string, details: any) => void      | chokidar.watch().on('raw', **callback**)       |
| all       | (watcher: FSWatcher, eventName: EventName, path: string, status?: Stats) => void | chokidar.watch().on('all', **callback**)       |
| error     | (watcher: FSWatcher, e: Error) => void                                           | chokidar.watch().on('error', **callback**)     |
