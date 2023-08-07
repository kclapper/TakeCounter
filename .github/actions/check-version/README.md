# Check version

Checks that the electron and web app versions match.

## Inputs

### 'electron-package-path'

**Required** The path to the electron package.json file.

### 'web-package-path'

**Required** The path to the web package.json file.

## Example 

``` yaml
uses: ./.github/actions/check-version
with:
  electron-package-path: ${{ env.electron-directory }}/package.json
  web-package-path: ${{ env.web-directory }}/package.json
```
