module.exports = {
  packagerConfig: {
    asar: true,
    icon: '../icon/icon.icns'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: "TakeCounter"
      },
    },
    {
      name: '@electron-forge/maker-zip',
      config: {}
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './webpack.main.config.cjs',
        renderer: {
          config: './webpack.renderer.config.cjs',
          entryPoints: [
            {
              html: '../web/public/index.html',
              js: '../web/src/index.js',
              name: 'main_window',
              preload: {
                js: './src/preload.cjs',
              },
            },
          ],
        },
      },
    },
  ],
};
