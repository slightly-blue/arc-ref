const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('electronAPI', {
    setSite: (site) => ipcRenderer.sendSync('synchronous-message', site),
    getStoreValue: (val) => ipcRenderer.sendSync('getStoreValue', val),
    setStoreValue: (val) => ipcRenderer.sendSync('setStoreValue', val)
})

// You can also put expose this code to the renderer
// process with the `contextBridge` API
// const result = ipcRenderer.sendSync('synchronous-message', 'ping')
// console.log(result) 