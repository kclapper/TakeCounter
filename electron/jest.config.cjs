/** @type {import('jest').Config} */

const config = {
    transform: {},
    testMatch: [
        "**/__tests__/**/*.?([mc])[jt]s?(x)", 
        "**/?(*.)+(spec|test).?([mc])[jt]s?(x)"
    ]
}

module.exports = config;