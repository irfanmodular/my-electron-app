//import modules. app -> event lifecycle. BrowserWindo -> app windows
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

//function to load web page window
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800, 
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

//callback function
app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()
})

//window & linux close app
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

//macOS close app
app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
})