import { WatchOptions, FSWatcher } from 'chokidar'
import { Stats } from 'fs'

type eventName = 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir'

export interface Target {
  compiler: any
  compilation: any
  watcher: FSWatcher
}

export interface ChokidarPluginFileEvent {
  ready(target: Target): void
  add(target: Target, path: string, status?: Stats): void
  addDir(target: Target, path: string, status?: Stats): void
  change(target: Target, path: string, status?: Stats): void
  unlink(target: Target, path: string, status?: Stats): void
  unlinkDir(target: Target, path: string, status?: Stats): void
  raw(target: Target, eventName: string, path: string, details: any): void
  all(target: Target, eventName: eventName, path: string, status?: Stats): void
  error(target: Target, e: Error): void
}

export interface ChokidarEvent {
  on?: Partial<ChokidarPluginFileEvent>
  close?: Promise<void>
  add?(paths: string | ReadonlyArray<string>): void
  unwatch?(paths: string | ReadonlyArray<string>): void
  getWatched?(): { [directory: string]: string[] }
}

export interface ChokidarConfig {
  file: string
  opt: WatchOptions
  actions: ChokidarEvent
}

export interface PluginOption {
  chokidarConfigList: ChokidarConfig[]
}
