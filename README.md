# Take Counter 

[![Test Take Counter](https://github.com/kclapper/TakeCounter/actions/workflows/test.yml/badge.svg)](https://github.com/kclapper/TakeCounter/actions/workflows/test.yml)

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

First, install the project dependencies:

    npm install

Then you can run the Electron app:

    npm start

or the web app:

    npm run web

You can also run the tests:

    npm test

and lint the code:

    npm run lint

Both `npm test` and `npm run lint` must pass in 
order to merge a PR.

### Organization

The UI and most of the application logic is kept in the
`components` folder. The Electron and web app logic are 
separated into the `electron` and `web` folders. All shared
code should go in `components` and platform specific code should
go in the respective folders.