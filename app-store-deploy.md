# App Store Connect Instructions

1. Open XCode, then go to account settings and find the 
"Manage Certificates" button. Make sure you have an 
"Apple Distribution" certificate for the app itself and
a "Mac Installer Distribution" certificate for the installer
wrapper.
2. Make sure you have the following environment variables:

```
export APPLE_TEAM_ID="7JAU73845B"
export APPLE_APP_CERTIFICATE="<ID or namem for the app certificate>"
export APPLE_INSTALLER_CERTIFICATE="<ID or name for the installer certificate>"
export APPLE_PROVISIONING_PROFILE="Take_Counter_App_Store_Connect.provisionprofile"
```

You can get the certificate IDs by running `security find-identity -v`.
3. Build with the `mas` platform. `npm run make -- -- --platform mas --arch universal`
4. Open the Apple Transporter app and add the `.pkg` for the app.
5. Click the three dots and "Verify" the app.
6. If there are no issues then upload it to App Store Connect.

## Notes
- The certificate used in the provisioning profile has to be the same as the app certificate
- You should create the certificates using XCode but you'll
need to create the profile online using the Apple Developer site 