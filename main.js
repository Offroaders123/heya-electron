const { app, BrowserWindow } = require("electron");

/**
 * @returns {Promise<BrowserWindow>}
 */
async function createWindow() {
  const window = new BrowserWindow();
  await window.loadFile("./index.html");
  return window;
}

app.whenReady().then(async () => {
  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length !== 0) return;
    await createWindow();
  });

  await createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform === "darwin") return;
  app.quit();
});