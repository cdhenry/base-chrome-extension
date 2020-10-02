# Base React/TS Chrome Extension

## Includes the following

-   TypeScript
-   React
-   Webpack

## Project Structure

-   `src`: Source files (includes manifest, icons, and HTMLs for Chrome)
-   `dist`: Where the Chrome Extension will be built

## Development build

```
yarn build
```

## Production build

Runs webpack and generates the minified bundles

```
yarn build:prod
```

## Load extension to chrome

-   Build the extension
-   Open Chrome and go to `chrome://extensions`
-   Click `Load unpacked extension...`
-   Load the `dist` directory

## Debugging your extension

-   Click on the icon of your extension opens the **popup** window
-   Right click and open DevTools
-   In DevTools you can press Ctrl+R to reload
