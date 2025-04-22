// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 320, height: 240 });

// Called when a user selects something in Figma
figma.on("selectionchange", () => {
  const selection = figma.currentPage.selection;
  let extractedText = "";
  
  if (selection.length > 0) {
    // Check if selected node is a text node
    if (selection[0].type === "TEXT") {
      extractedText = (selection[0] as TextNode).characters;
    } 
    // Check for text in properties
    else {
      // Try to find text properties in the selected node
      // This is a simplification - actual implementation would depend on Figma's structure
      const node = selection[0] as any;
      if (node.characters) {
        extractedText = node.characters;
      } else if (node.name) {
        extractedText = node.name;
      }
    }
  }
  
  // Send the extracted text to the UI
  figma.ui.postMessage({ 
    type: "selection-change", 
    text: extractedText,
    hasSelection: selection.length > 0
  });
});

// Message handler for messages from the UI
figma.ui.onmessage = (pluginMessage: { type: string }) => {
  // Handle messages from the UI
  if (pluginMessage.type === 'copy-text') {
    // Nothing to do here as copying is handled in the UI
    console.log('Text copied to clipboard');
  }
  
  // If we want to close the plugin after copying
  if (pluginMessage.type === 'close') {
    figma.closePlugin();
  }
};