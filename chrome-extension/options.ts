// Save options to Chrome's storage
function saveOptions() {
  const extensionEnabled = (document.getElementById('extensionEnabled') as HTMLInputElement).checked;
  const mergeClipboard = (document.getElementById('mergeClipboard') as HTMLInputElement).checked;
  const separator = (document.getElementById('separator') as HTMLInputElement).value;
  
  chrome.storage.sync.set(
    {
      extensionEnabled: extensionEnabled,
      mergeClipboard: mergeClipboard,
      separator: separator
    },
    () => {
      // Update status to let user know options were saved
      const status = document.getElementById('status');
      if (status) {
        status.textContent = 'Options saved.';
        status.className = 'status success';
        status.style.display = 'block';
        
        setTimeout(() => {
          status.style.display = 'none';
        }, 2000);
      }
    }
  );
}

// Restore options from Chrome's storage
function restoreOptions() {
  chrome.storage.sync.get(
    {
      // Default values
      extensionEnabled: true,
      mergeClipboard: false,
      separator: '\\t'
    },
    (items) => {
      (document.getElementById('extensionEnabled') as HTMLInputElement).checked = items.extensionEnabled;
      (document.getElementById('mergeClipboard') as HTMLInputElement).checked = items.mergeClipboard;
      (document.getElementById('separator') as HTMLInputElement).value = items.separator;
    }
  );
}

// Add event listeners
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save')?.addEventListener('click', saveOptions); 