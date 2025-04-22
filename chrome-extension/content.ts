// Main functionality
console.log('Simple Text Copier extension loaded');

// Track if Alt key is pressed
let isAltKeyPressed = false;

// Function to initialize the extension
function initExtension() {
    console.log('Initializing extension');
    
    // Listen for keydown events to track Alt key
    document.addEventListener('keydown', function(e: KeyboardEvent) {
        if (e.altKey) {
            isAltKeyPressed = true;
            console.log('Alt key pressed');
        }
    }, true);
    
    // Listen for keyup events to track when Alt key is released
    document.addEventListener('keyup', function(e: KeyboardEvent) {
        if (!e.altKey) {
            isAltKeyPressed = false;
            console.log('Alt key released');
        }
    }, true);
    
    // Use capturing phase for the click listener to ensure it runs before Figma's handlers
    document.addEventListener('click', handleClick, true);
    
    // For Figma specifically, also try mousedown events
    if (window.location.hostname.includes('figma.com')) {
        console.log('Figma detected, adding mousedown listener');
        document.addEventListener('mousedown', handleClick, true);
        
        // Watch for Figma interface updates using MutationObserver
        observeFigmaChanges();
    }
}

// Function to handle click events
function handleClick(e: MouseEvent) {
    try {
        // Only proceed if Alt key is pressed during click
        if (!isAltKeyPressed) {
            return;
        }

        console.log('Alt+Click detected');
        
        // Check if we're on Figma
        if (window.location.hostname.includes('figma.com')) {
            console.log('Figma click detected');
            
            // If the click was directly on an input element
            const target = e.target as HTMLElement;
            console.log('Clicked element:', target.tagName, target);
            
            // For text inputs
            if (target.tagName === 'INPUT' && target.getAttribute('type') === 'text') {
                console.log('Clicked directly on input element');
                const inputElement = target as HTMLInputElement;
                copyToClipboard(inputElement.value);
                e.stopPropagation(); // Try to prevent Figma from handling this event
                return;
            }
            
            // For Figma: Look for text inputs near the clicked element
            const closestInput = findClosestInput(target);
            if (closestInput) {
                console.log('Found closest input element:', closestInput);
                copyToClipboard(closestInput.value);
                e.stopPropagation(); // Try to prevent Figma from handling this event
                return;
            }
            
            // Try to find text fields in the Figma UI
            const textFields = findFigmaTextFields();
            if (textFields.length > 0) {
                console.log('Found Figma text fields:', textFields);
                copyToClipboard(textFields[0].value);
                e.stopPropagation(); // Try to prevent Figma from handling this event
                return;
            }
            
            // Default to copying text content if other methods fail
            console.log('Using fallback method - copying text content');
            copyToClipboard(target.textContent?.trim() || '');
            e.stopPropagation(); // Try to prevent Figma from handling this event
        } else {
            // For regular web pages: Copy text from clicked element
            console.log('Regular webpage detected');
            const target = e.target as HTMLElement;
            console.log('Clicked element:', target.tagName);
            copyToClipboard(target.textContent?.trim() || '');
        }
    } catch (error) {
        console.error('Error in Simple Text Copier extension:', error);
    }
}

// Helper function to find the closest input element to the clicked element
function findClosestInput(element: HTMLElement): HTMLInputElement | null {
    // First check if this element is an input
    if (element.tagName === 'INPUT') {
        return element as HTMLInputElement;
    }
    
    // Then check children
    const inputChild = element.querySelector('input');
    if (inputChild) {
        return inputChild as HTMLInputElement;
    }
    
    // Then check parent containers (up to 5 levels)
    let current = element;
    for (let i = 0; i < 5; i++) {
        const parent = current.parentElement;
        if (!parent) break;
        
        const input = parent.querySelector('input');
        if (input) {
            return input as HTMLInputElement;
        }
        current = parent;
    }
    
    return null;
}

// Helper function to find text fields in Figma UI
function findFigmaTextFields(): HTMLInputElement[] {
    const results: HTMLInputElement[] = [];
    
    // Try various Figma-specific selectors
    const selectors = [
        '[data-label="Text"] input',
        '.instanceproperty input[type="text"]',
        'input[placeholder="Text"]',
        'input[class*="text"]', 
        'input[type="text"]',
        '[role="textbox"]'
    ];
    
    for (const selector of selectors) {
        const elements = document.querySelectorAll<HTMLInputElement>(selector);
        elements.forEach(el => {
            if (el.value && !results.includes(el)) {
                results.push(el);
            }
        });
    }
    
    return results;
}

// Helper function to observe Figma UI changes
function observeFigmaChanges() {
    console.log('Setting up Figma UI observer');
    
    // Options for the observer (which mutations to observe)
    const config = { 
        childList: true, 
        subtree: true 
    };
    
    // Callback function to execute when mutations are observed
    const callback = function(mutationsList: MutationRecord[], observer: MutationObserver) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                console.log('Figma UI updated, re-checking for text fields');
                const textFields = findFigmaTextFields();
                if (textFields.length > 0) {
                    console.log('Found text fields after UI update:', textFields);
                }
            }
        }
    };
    
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, config);
}

// Helper function to copy text
function copyToClipboard(text: string): void {
    if (!text) {
        console.log('No text to copy');
        return;
    }
    
    console.log('Attempting to copy text:', text);
    
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied successfully');
            showFeedback(`Copied: "${text.length > 50 ? text.substring(0, 47) + '...' : text}"`);
        })
        .catch(err => {
            console.error('Failed to copy:', err);
            // Fallback method for copying
            fallbackCopy(text);
        });
}

// Fallback copy method using execCommand (deprecated but sometimes works in sandboxed environments)
function fallbackCopy(text: string): void {
    try {
        console.log('Trying fallback copy method');
        const textArea = document.createElement('textarea');
        textArea.value = text;
        
        // Make the textarea out of viewport
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        if (successful) {
            console.log('Fallback copy successful');
            showFeedback(`Copied: "${text.length > 50 ? text.substring(0, 47) + '...' : text}"`);
        } else {
            console.error('Fallback copy failed');
            showFeedback('Failed to copy text');
        }
        
        document.body.removeChild(textArea);
    } catch (err) {
        console.error('Fallback copy error:', err);
        showFeedback('Failed to copy text');
    }
}

// Simple visual feedback
function showFeedback(message: string): void {
    console.log('Showing feedback:', message);
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
        z-index: 999999; /* Very high z-index to appear above Figma UI */
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(feedback);
    setTimeout(() => {
        if (document.body.contains(feedback)) {
            document.body.removeChild(feedback);
        }
    }, 2000);
}

// Initialize the extension when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExtension);
} else {
    initExtension();
}

// Re-initialize after a delay to catch late-loading Figma UI
setTimeout(initExtension, 2000); 