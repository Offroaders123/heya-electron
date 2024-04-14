import { ipcRenderer, contextBridge } from 'electron'

/** @type {typeof ipcRenderer.on} */
const on = (channel, listener) => {
  return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
}
/** @type {typeof ipcRenderer.off} */
const off = (channel, listener, ...args) => {
  return ipcRenderer.off(channel, listener, ...args)
}
/** @type {typeof ipcRenderer.send} */
const send = (channel, ...args) => {
  return ipcRenderer.send(channel, ...args)
}
/** @type {typeof ipcRenderer.invoke} */
const invoke = (channel, ...args) => {
  return ipcRenderer.invoke(channel, ...args)
}

/** @type {IpcRendererPublic} */
const ipcRendererPublic = {
  on,
  off,
  send,
  invoke

  // You can expose other APTs you need here.
  // ...
}

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', ipcRendererPublic)
