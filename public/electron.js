const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const { scrapeService } = require('./scraping/electronScrapeService')

const Store = require('electron-store');
const store = new Store();

console.log("data is stored in:", app.getPath('userData'))

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    //titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    //titleBarOverlay: true,
    webPreferences: {
      nodeIntegration: true,
      //contextIsolation: false,
      enableRemoteModule: true,
      //contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
  });



  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  ipcMain.on('synchronous-message', async (event, arg) => {
    const result = await scrapeService(arg)
    event.returnValue = result
  })

  ipcMain.on('getStoreValue', async (event, key) => {
    try {
      const result = await store.get(key); //, (err) => { if (err) { console.log(err) } }
      console.log("get called")
      event.returnValue = result
    } catch (error) {
      event.returnValue = undefined
      console.log(error)
    }
  });

  ipcMain.on('setStoreValue', async (event, key) => {
    try {
      const result = await store.set(key[0], key[1]);
      console.log("set called")
      event.returnValue = result
    } catch (error) {
      console.log(error)
    }
  });

  createWindow()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});