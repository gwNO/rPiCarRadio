require(process.cwd() + '/node_modules/benja').paths();

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.commandLine.appendSwitch('--ignore-gpu-blacklist');

app.once('ready', () => {
  const area = electron.screen.getPrimaryDisplay().workAreaSize;

  this.window = new BrowserWindow({
    backgroundColor: '#ffffff',
    frame: false,
    fullscreen: true,
    x: 0,
    y: 0,
    width: area.width,
    height: area.height
  });

  this.window
    .once('closed', () => {
      this.window = null;
    })
    .loadURL(`file://${__dirname}/dist/index.html`);
  this.window.webContents.openDevTools();

  require('fs').watch('reload', () => app.quit());
});