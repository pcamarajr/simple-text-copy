# Simple Text Copier - Project Overview

## Introduction
Simple Text Copier is a dual-component tool designed to streamline text extraction from both web pages and Figma designs. It consists of a Chrome extension and a Figma plugin, both engineered to provide a consistent, frictionless copying experience across different platforms.

## Problem Statement
Designers and developers frequently need to extract text content from designs and web pages. The traditional process of selecting, copying, and cleaning text can be cumbersome, especially when dealing with:
- Text embedded in complex UI components
- Formatted text in design tools like Figma
- Text that includes unwanted formatting, line breaks, or special characters

## Solution
Simple Text Copier addresses these challenges by providing:

### Chrome Extension
- **Alt+Click Functionality**: Quickly extract plain text from any element on a webpage by holding Alt and clicking
- **Format Cleaning**: Automatically strips unwanted formatting, preserving only the plain text
- **Visual Feedback**: Shows what text has been copied through a subtle, non-intrusive notification
- **Minimal Permissions**: Only requests necessary permissions for a lighter, more secure experience

### Figma Plugin
- **Direct Text Extraction**: Extracts text from any Figma text layer or component
- **Properties Panel Integration**: Works with text values displayed in the properties panel
- **Clean Copy**: Ensures text is copied without any design-specific formatting or metadata
- **User-Friendly Interface**: Simple UI with clear functionality

## Technical Architecture

### Chrome Extension
- Built with TypeScript for type safety and maintainability
- Uses Manifest V3 for enhanced security and performance
- Content script-based implementation that injects minimal code into web pages
- Event-driven architecture to handle keyboard and mouse interactions

### Figma Plugin
- Implements Figma's plugin API for seamless integration
- Split architecture with UI and code components
- Responsive to Figma's selection events and property changes
- Optimized for Figma's sandboxed environment

### Monorepo Architecture
- **npm Workspaces**: Uses npm's built-in workspaces feature to manage multiple packages in a single repository
- **Centralized Dependency Management**: Single `package.json` at the root controls shared dependencies
- **Simplified Commands**: Run build, test, and development tasks across all packages with a single command
- **Consistent Versioning**: All packages are developed and released in sync
- **Shared Configuration**: Common TypeScript and build settings are defined at the root level
- **Optimized Structure**: Each component (Chrome extension, Figma plugin) maintains its own isolated package

## Use Cases

1. **Design Implementation**:
   - Developers can quickly extract exact text from Figma designs for implementation
   - Eliminates transcription errors when transferring text from designs to code

2. **Content Extraction**:
   - Content writers can pull text from existing web pages for reference or modification
   - Researchers can collect text data without manual formatting cleanup

3. **Cross-Platform Workflow**:
   - Designers can seamlessly move text between Figma and other applications
   - Teams can maintain text consistency across design and implementation phases

## Development Workflow

### Install
One command to install all dependencies across packages:
```
npm install
```

### Build
Build all components at once:
```
npm run build
```

Or build specific components:
```
npm run build:chrome
npm run build:figma
```

### Development
Watch mode for each component:
```
npm run watch:chrome
npm run watch:figma
```

## Future Enhancements

1. **Smart Formatting Detection**:
   - Ability to preserve specific formatting elements when desired
   - Recognition of structured text patterns like lists, tables, and headings

2. **Text Transformation Options**:
   - On-the-fly text case conversion (uppercase, lowercase, title case)
   - Special character and whitespace normalization options

3. **Integration Expansion**:
   - Support for additional design tools beyond Figma
   - Integration with note-taking apps and project management tools

## Development Approach
The project follows a modular development approach with shared principles across both components:
- Minimal resource footprint
- Non-intrusive user experience
- Robust error handling
- Consistent interaction patterns
- Unified build and development workflow through npm workspaces

## Conclusion
Simple Text Copier represents a thoughtful solution to a common workflow friction point. By providing specialized tools for both web browsing and design environments, it creates a unified text extraction experience that saves time and reduces errors in the design-to-implementation pipeline. The monorepo architecture ensures a consistent development experience with simplified workflows for both maintenance and feature development. 