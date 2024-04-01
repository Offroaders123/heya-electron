import { ipcRenderer, contextBridge } from 'electron'

const on: typeof ipcRenderer.on = (channel, listener) => {
  return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
}
const off: typeof ipcRenderer.off = (channel, listener, ...args) => {
  return ipcRenderer.off(channel, listener, ...args)
}
const send: typeof ipcRenderer.send = (channel, ...args) => {
  return ipcRenderer.send(channel, ...args)
}
const invoke: typeof ipcRenderer.invoke = (channel, ...args) => {
  return ipcRenderer.invoke(channel, ...args)
}

const ipcRendererPublic = {
  on,
  off,
  send,
  invoke

  // You can expose other APTs you need here.
  // ...
}

declare global {
  interface Window {
    /**
     * Used in Renderer process, expose in `preload.ts`
     */
    ipcRenderer: typeof ipcRendererPublic
  }
}

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', ipcRendererPublic)
