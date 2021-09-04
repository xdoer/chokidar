import { WatchOptions, FSWatcher } from 'chokidar'
import { Stats } from 'fs'

export interface ChokidarOption {
  target: string | ReadonlyArray<string>
  watch: Partial<ChokidarWatchEvent>
  options?: WatchOptions
}

type EventName = 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir'

export interface ChokidarWatchEvent {
  ready(watcher: FSWatcher): void
  add(watcher: FSWatcher, path: string, status?: Stats): void
  addDir(watcher: FSWatcher, path: string, status?: Stats): void
  change(watcher: FSWatcher, path: string, status?: Stats): void
  unlink(watcher: FSWatcher, path: string, status?: Stats): void
  unlinkDir(watcher: FSWatcher, path: string, status?: Stats): void
  raw(watcher: FSWatcher, eventName: string, path: string, details: any): void
  all(watcher: FSWatcher, eventName: EventName, path: string, status?: Stats): void
  error(watcher: FSWatcher, e: Error): void
}

export interface Chokidar {
  options?: WatchOptions
  list: ChokidarOption[]
}
