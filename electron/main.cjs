import { app, BrowserWindow, shell } from 'electron'
import contextMenu from 'electron-context-menu'
import { join } from 'node:path'

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
    icon: join('./public/electron-vite.svg'),
    webPreferences: {
      preload: join(__dirname, 'preload.cjs'),
    },
  })

  win.webContents.setWindowOpenHandler(event => {
    shell.openExternal(event.url)

    return {
      action: 'deny'
    }
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  win.loadFile('index.html')

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
