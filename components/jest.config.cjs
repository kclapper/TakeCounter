/** @type {import('jest').Config} */

const config = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [
        './src/setupTest.js'
    ],
    moduleNameMapper: {
        // Matches CSS Modules (e.g., styles.module.css or styles.module.scss)
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
}

module.exports = config;