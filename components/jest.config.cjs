/** @type {import('jest').Config} */

const config = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [
        './src/setupTest.js'
    ]
}

module.exports = config;