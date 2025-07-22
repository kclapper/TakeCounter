// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('counter', {
  handleIncrement: (callback) => {
    ipcRenderer.removeAllListeners('increment-counter');
    ipcRenderer.on('increment-counter', callback);
  },
  handleDecrement: (callback) => {
    ipcRenderer.removeAllListeners('decrement-counter');
    ipcRenderer.on('decrement-counter', callback);
  },
  handleReset: (callback) => {
    ipcRenderer.removeAllListeners('reset-counter');
    ipcRenderer.on('reset-counter', callback);
  },
  handleSetCount: (callback) => {
    ipcRenderer.removeAllListeners('set-count');
    ipcRenderer.on('set-count', (event, count) => {
      callback(count);
    });
  },
});

contextBridge.exposeInMainWorld('settings', {
  getSettings: () => ipcRenderer.invoke('get-settings'),
  changeSettings: (settings) => ipcRenderer.invoke('change-settings', settings),
  showDialog: (arg) => ipcRenderer.invoke('show-dialog', arg),
  handleDialogResponse: (callback) => {
    ipcRenderer.removeAllListeners('dialog-response');
    ipcRenderer.addListener('dialog-response', (event, dialogResponse) => {
      if (dialogResponse.filePaths) {
        callback(dialogResponse.filePaths[0]);
      }
    });
  }
});
