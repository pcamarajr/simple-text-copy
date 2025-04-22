document.addEventListener('DOMContentLoaded', () => {
  // Get the UI elements
  const statusIndicator = document.getElementById('statusIndicator') as HTMLDivElement;
  const statusText = document.getElementById('statusText') as HTMLSpanElement;
  const extensionToggle = document.getElementById('extensionToggle') as HTMLInputElement;
  const mergeToggle = document.getElementById('mergeToggle') as HTMLInputElement;
  const openOptionsButton = document.getElementById('openOptions') as HTMLButtonElement;

  // Load the current settings
  chrome.storage.sync.get(
    {
      extensionEnabled: true,
      mergeClipboard: false,
      separator: '\\t'
    },
    (items) => {
      // Update the UI to reflect current settings
      extensionToggle.checked = items.extensionEnabled;
      mergeToggle.checked = items.mergeClipboard;
      updateStatusIndicator(items.extensionEnabled);
    }
  );

  // Function to update the status indicator
  function updateStatusIndicator(enabled: boolean) {
    if (enabled) {
      statusIndicator.className = 'status-indicator enabled';
      statusText.textContent = 'Extension is enabled';
    } else {
      statusIndicator.className = 'status-indicator disabled';
      statusText.textContent = 'Extension is disabled';
    }
  }

  // Handle extension toggle changes
  extensionToggle.addEventListener('change', () => {
    const enabled = extensionToggle.checked;
    chrome.storage.sync.set({ extensionEnabled: enabled }, () => {
      updateStatusIndicator(enabled);
    });
  });

  // Handle merge toggle changes
  mergeToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ mergeClipboard: mergeToggle.checked });
  });

  // Open options page when button is clicked
  openOptionsButton.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
}); 