import type { ipcRenderer } from "electron";

declare global {
  interface IpcRendererPublic {
    on: typeof ipcRenderer.on;
    off: typeof ipcRenderer.off;
    send: typeof ipcRenderer.send;
    invoke: typeof ipcRenderer.invoke;
  }

  interface Window {
    /**
     * Used in Renderer process, expose in `preload.ts`
     */
    ipcRenderer: IpcRendererPublic;
  }
}

export {};