const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setSite: (site) => ipcRenderer.sendSync('synchronous-message', site),
    getStoreValue: (val) => ipcRenderer.sendSync('getStoreValue', val),
    setStoreValue: (val) => ipcRenderer.sendSync('setStoreValue', val),
    receive: (channel, func) => ipcRenderer.on(channel, (event, data) => func(data)),
    send: (channel, val) => ipcRenderer.send(channel, val)
})
