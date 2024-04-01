import { ipcRenderer, contextBridge, type IpcRenderer } from 'electron'

declare global {
  interface Window {
    /**
     * Used in Renderer process, expose in `preload.ts`
     */
    ipcRenderer: Pick<IpcRenderer, "on" | "off" | "send" | "invoke">
  }
}

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>): Electron.IpcRenderer {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>): Electron.IpcRenderer {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>): void {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>): Promise<any> {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})
