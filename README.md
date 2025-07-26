# Take Counter 

[![Test Web App](https://github.com/kclapper/TakeCounter/actions/workflows/test-web-app.yml/badge.svg)](https://github.com/kclapper/TakeCounter/actions/workflows/test-web-app.yml)
[![Test Electron App](https://github.com/kclapper/TakeCounter/actions/workflows/test-electron-app.yml/badge.svg)](https://github.com/kclapper/TakeCounter/actions/workflows/test-electron-app.yml)
[![Test Common Libraries](https://github.com/kclapper/TakeCounter/actions/workflows/test-common.yml/badge.svg)](https://github.com/kclapper/TakeCounter/actions/workflows/test-common.yml)

Take Counter is an app to help track takes during recording sessions. It allows
engineers to keep the current take visible on screen while working in another
app like ProTools. It's been designed and built in collaboration with recording
engineers from New York and London.

Take Counter is available as a Universal MacOS app. 
[A web version is also available.](https://takecounter.kyleclapper.dev)

## Features

- Manually enter and change the take
- Customizable global keyboard shortcuts
- Automatic, audio file based, take tracking
- Always on top display (togglable)

![Screenshot of Take Counter](./desktop-screenshot.png)

## Development

The UI for the application is kept in the `web` folder and the code for the desktop is kept in the `electron` folder.

To start developing:

    cd web
    npm install
    cd ../electron
    npm install
    npm start