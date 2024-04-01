import { app, BrowserWindow } from 'electron'
import contextMenu from 'electron-context-menu'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = fileURLToPath(new URL('../dist', import.meta.url))
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST, '../public')


// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

const dispose = contextMenu({
  showLearnSpelling: true,
  showLookUpSelection: true,
  showSearchWithGoogle: true,
  showSelectAll: true,
  showCopyImage: true,
  showCopyImageAddress: true,
  showSaveImage: true,
  showSaveImageAs: true,
  showCopyVideoAddress: true,
  showSaveVideo: true,
  showSaveVideoAs: true,
  showCopyLink: true,
  showSaveLinkAs: true,
  showInspectElement: true
})

async function createWindow(): Promise<BrowserWindow> {
  const win = new BrowserWindow({
    icon: join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: fileURLToPath(new URL('preload.cjs', import.meta.url)),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    await win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    await win.loadFile(join(process.env.DIST, 'index.html'))
  }

  return win;
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    dispose()
  }
})

app.on('activate', async () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow()
  }
})

app.whenReady().then(async () => {
  await createWindow()
})
