# Take Counter 

[![Test Web App](https://github.com/kclapper/counter/actions/workflows/test-web-app.yml/badge.svg)](https://github.com/kclapper/counter/actions/workflows/test-web-app.yml)
[![Test Electron App](https://github.com/kclapper/counter/actions/workflows/test-electron-app.yml/badge.svg)](https://github.com/kclapper/counter/actions/workflows/test-electron-app.yml)
[![Test Common Libraries](https://github.com/kclapper/counter/actions/workflows/test-common.yml/badge.svg)](https://github.com/kclapper/counter/actions/workflows/test-common.yml)

Take Counter is an app to help track takes during recording sessions. It allows
engineers to keep the current take visible on screen while working in another
app like ProTools. Global keyboard shortcuts allow the engineer to change the
current take without distraction. 

Take Counter is available as a Universal MacOS app. 
[A web version is also available.](https://takecounter.kyleclapper.dev)

## Features

- Increment, decrement, and reset the current take
- Type in a new take number
- Customizable global keyboard shortcuts
- Always on top display (togglable)

![Screenshot of Take Counter](./desktop-screenshot.png)

## For Potential Employers

This project showcases my ability to create web and native apps using React and
Electron. There are a few aspects of this project I'd like to highlight in particular.

This project uses Github actions for it's CI/CD pipeline. I've put together 
workflows for several major devops activities such as:
- Running tests every time a commit is added to the main branch
- Releasing the app when a semantic version tag is pushed, including:
  - Checking the tag, web app version, and Electron app version all match
  - Building and deploying the web app to Github Pages
  - Building and deploying the Electron app to AWS S3
  
A custom Github Javascript action was written to check that the semantic version
for the web app, Electron app, and git tag all match for every release.

### Backstory

This project came about while visiting my friend Ben, a recording engineer in
New York. He wanted to build an app to help show the current take number on his
computer screen during recording sessions. He explained that he wasn't quite
sure how to get started, but that he knew what features he wanted.

I didn't have my laptop on hand, so we created a Github repository on his
account. I was most familiar with React for building UIs, so we quickly setup
a React app and within an hour and half had a working prototype.

Since then, with his guidance on what features were most important,
I've expanded the app to include an Electron version and various other features.
This is where the app is now. We have a list of features we'd like in version
1 of this app and the goal is to finish before the end of the summer.

