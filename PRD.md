Ah, this simplifies the project significantly! Let's create a streamlined specification for a text-only copier that focuses on getting the current node's text content.

### Project Specification: Simple Text Copier

#### Project Overview
A lightweight Chrome extension that copies plain text from the currently selected/clicked element in Figma (focusing on the text in the properties panel) and any web page.

#### Core Features

1. **Simple Text Copying**
   - Copy plain text only (no formatting)
   - For Figma: Copy text from the properties panel when a layer is selected
   - For web pages: Copy text from clicked elements
   - Instant copy to clipboard
   - Optional: Small visual feedback when text is copied

#### Technical Implementation

1. **Manifest.json**
```json
{
  "manifest_version": 3,
  "name": "Simple Text Copier",
  "version": "1.0",
  "description": "Copy plain text from Figma and web pages",
  "permissions": [
    "activeTab",
    "clipboardWrite"
  ],
  "host_permissions": [
    "https://www.figma.com/*",
    "<all_urls>"
  ],
  "action": {
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["content.js"]
  }]
}
```

2. **content.js (Core Logic)**
```javascript
// Main functionality
document.addEventListener('click', function(e) {
    // Check if we're on Figma
    if (window.location.hostname === 'www.figma.com') {
        // For Figma: Look for the text in properties panel
        const textProperty = document.querySelector('[data-label="Text"] input');
        if (textProperty) {
            copyToClipboard(textProperty.value);
        }
    } else {
        // For regular web pages: Copy text from clicked element
        copyToClipboard(e.target.textContent.trim());
    }
});

// Helper function to copy text
function copyToClipboard(text) {
    if (!text) return;
    
    navigator.clipboard.writeText(text)
        .then(() => showFeedback('Copied!'))
        .catch(err => console.error('Failed to copy:', err));
}

// Simple visual feedback
function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        z-index: 9999;
    `;
    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 1500);
}
```

#### File Structure
```
simple-copier/
├── manifest.json
├── content.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

#### Development Steps

1. **Initial Setup** (1 day)
   - Create extension structure
   - Set up manifest
   - Create basic icons

2. **Core Development** (1-2 days)
   - Implement content script
   - Add Figma-specific text extraction
   - Add web page text extraction
   - Implement clipboard functionality

3. **Testing & Refinement** (1 day)
   - Test on Figma
   - Test on various websites
   - Fix any issues
   - Optimize performance

#### Usage Instructions

1. **For Figma:**
   - Click on a layer containing text
   - Click on the text shown in the properties panel
   - Text is automatically copied to clipboard

2. **For Web Pages:**
   - Click on any text element
   - Text is automatically copied to clipboard

#### Limitations
- Only copies plain text
- In Figma, relies on the properties panel being visible
- No keyboard shortcuts (could be added as enhancement)

#### Future Enhancements
1. Add keyboard shortcuts
2. Add right-click context menu option
3. Add copy history
4. Add option to toggle automatic copy on click

#### Testing Checklist
- [ ] Extension loads correctly
- [ ] Copies text from Figma properties panel
- [ ] Copies text from regular web pages
- [ ] Shows feedback when text is copied
- [ ] Handles empty text gracefully
- [ ] Works with different text lengths

This simplified version focuses on the essential functionality while remaining lightweight and easy to use. The implementation is straightforward and should take about 3-4 days to complete, including testing and refinement.