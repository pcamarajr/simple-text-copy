# Simple Text Copier

A lightweight Chrome extension and Figma plugin that copies plain text from the currently selected/clicked element in Figma (focusing on the text in the properties panel) and any web page.

## Features

- Chrome Extension: Copy plain text from any webpage with Alt+Click
- Figma Plugin: Copy text from any text layer or element in Figma
- Shows visual feedback with the copied text
- Extremely lightweight with minimal permissions
- Easy enable/disable toggle in the extension popup
- Clipboard merge functionality for spreadsheet workflows

## Chrome Extension

### Installation

#### From Source Code

1. Clone or download this repository
2. Install all dependencies with `npm install`
3. Build the extension with `npm run build` or just `npm run build:chrome` for only the Chrome extension
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode" (toggle in the top-right corner)
6. Click "Load unpacked" and select the `dist/chrome` directory from this project

#### From Chrome Web Store

*(Once published)*

1. Visit the Chrome Web Store page
2. Click "Add to Chrome"

### Usage

Hold the Alt key and click on any text element to copy its content.

#### For Web Pages:

1. Hold Alt and click on any text element on a web page
2. Text is automatically copied to clipboard

#### Extension Settings

Access settings by clicking on the extension icon in your toolbar:

- **Enable/Disable**: Quickly toggle the extension on/off without uninstalling
- **Merge with Clipboard**: Combine newly copied text with existing clipboard content
- **Open Options**: Access additional settings like separator configuration

#### Clipboard Merge Functionality

For data collection and spreadsheet workflows:

1. Enable "Merge with clipboard" in extension settings
2. When you copy text with Alt+Click, it will be merged with existing clipboard content
3. The default separator is a tab character (`\t`), which creates columns when pasted into spreadsheets
4. You can customize the separator in the options page (e.g., use comma for CSV format)

Example:
- If "Some existing text" is in your clipboard
- And you Alt+Click to copy "New text"
- Your clipboard will contain: "New text[tab]Some existing text"
- When pasted into a spreadsheet, it will appear as two separate columns

## Figma Plugin

Since Chrome extensions cannot directly interact with Figma's content due to Figma's security model, we've also created a Figma plugin to provide the same functionality within Figma.

### Installation

1. Clone or download this repository
2. Install all dependencies with `npm install`
3. Build the Figma plugin with `npm run build` or just `npm run build:figma` for only the Figma plugin
4. In Figma, go to Plugins > Development > Import plugin from manifest
5. Select the `dist/figma/manifest.json` file

### Usage

1. Select a text element or any element containing text in Figma
2. Run the plugin via Plugins > Development > Simple Text Copier
3. The plugin will display the text content
4. Click "Copy to Clipboard" to copy the text

## Building

This project uses npm workspaces to manage the Chrome extension and Figma plugin in a monorepo structure.

### Build Everything
```
npm install
npm run build
```

### Build Specific Component
```
# Chrome Extension only
npm run build:chrome

# Figma Plugin only
npm run build:figma
```

## Project Structure

```
redify/
├── README.md          # This file
├── ABOUT.md           # Project overview
├── package.json       # Main package configuration with workspaces
├── dist/              # Build output directory
│   ├── chrome/        # Chrome extension build output
│   └── figma/         # Figma plugin build output
├── chrome-extension/  # Chrome extension source code
│   ├── content.ts     # Extension content script
│   ├── manifest.json  # Extension manifest
│   ├── options.html   # Extension options page
│   ├── options.ts     # Options page functionality
│   ├── popup.html     # Extension popup
│   ├── popup.ts       # Popup functionality
│   ├── package.json   # Extension-specific dependencies
│   ├── tsconfig.json  # TypeScript configuration
│   └── icons/         # Extension icons
└── figma-plugin/      # Figma plugin source code
    ├── code.ts        # Plugin code
    ├── ui.html        # Plugin UI
    ├── manifest.json  # Plugin manifest
    ├── package.json   # Plugin-specific dependencies 
    └── tsconfig.json  # TypeScript configuration
```

## Debugging

### Chrome Extension

If the extension isn't working as expected:

1. Open the browser's Developer Tools (F12 or Right-click > Inspect)
2. Go to the Console tab
3. Look for messages starting with "Simple Text Copier extension"

### Figma Plugin

To debug the Figma plugin:

1. In Figma, run the plugin via Plugins > Development > Simple Text Copier
2. Right-click anywhere in the plugin UI and select "Inspect Element"
3. The Developer Tools will open with Console access

## Development

### Setup
```
npm install
```

### Watch for Changes
```
# Chrome Extension
npm run watch:chrome

# Figma Plugin
npm run watch:figma
```

### Clean Build Output
```
npm run clean
```

## License

MIT