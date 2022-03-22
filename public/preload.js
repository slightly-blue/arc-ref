const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    //setSite: (site) => ipcRenderer.send('console', site)
    //setSite: (callback) => ipcRenderer.on('console', callback)
    setSite: (site) => ipcRenderer.sendSync('synchronous-message', site)
   
})

// You can also put expose this code to the renderer
// process with the `contextBridge` API
// const result = ipcRenderer.sendSync('synchronous-message', 'ping')
// console.log(result) 