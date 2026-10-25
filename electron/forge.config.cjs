const path = require('path');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: '../icon/icon.icns',
    appBundleId: 'co.widesoftware.takecounter',
    osxSign: {
      identity: process.env.APPLE_APP_CERTIFICATE,
      provisioningProfile: process.env.APPLE_PROVISIONING_PROFILE,
      optionsForFile: (filePath) => {
        // Direct the main application binary to the parent entitlements
        const isMainApp = filePath.endsWith('.app') && !filePath.includes('Helper');
        
        return {
          hardenedRuntime: false,
          entitlements: isMainApp 
            ? path.resolve(__dirname, 'entitlements.mas.plist')
            : path.resolve(__dirname, 'entitlements.mas.inherit.plist')
        };    
      }
    }
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-pkg',
      platforms: ['mas'],
      config: {
        identity: process.env.APPLE_INSTALLER_CERTIFICATE,
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {}
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
