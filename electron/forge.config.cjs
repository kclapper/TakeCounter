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
              html: './src/main_window/index.html',
              js: './src/main_window/index.jsx',
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
