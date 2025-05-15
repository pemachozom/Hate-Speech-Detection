// Function to extract all visible text
function extractText() {
  let bodyText = "";
  const elements = document.body.querySelectorAll("*:not(script):not(style)");

  elements.forEach(element => {
      const style = window.getComputedStyle(element);
      if (style.display !== "none" && style.visibility === "visible") {
          const text = element.textContent.trim();
          if (text) bodyText += text + " ";
      }
  });

  return bodyText;
}

// Extract the text
const pageText = extractText();
console.log("Extracted Text:", pageText);

// Send the extracted text to the background service worker for API call
chrome.runtime.sendMessage({ action: "sendToAPI", data: pageText });

// Function to create a fullscreen warning popup
function showWarningPopup(message) {
  // Create the overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  overlay.style.color = "white";
  overlay.style.zIndex = "9999";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.fontSize = "1.5rem";
  overlay.style.textAlign = "center";

  // Add the warning message
  const warningMessage = document.createElement("p");
  warningMessage.textContent = message;

  // Add a close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.marginTop = "20px";
  closeButton.style.padding = "10px 20px";
  closeButton.style.fontSize = "1rem";
  closeButton.style.cursor = "pointer";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "5px";
  closeButton.style.backgroundColor = "red";
  closeButton.style.color = "white";

  // Close button logic
  closeButton.addEventListener("click", () => {
      document.body.removeChild(overlay);
  });

  // Append elements to the overlay
  overlay.appendChild(warningMessage);
  overlay.appendChild(closeButton);

  // Append the overlay to the body
  document.body.appendChild(overlay);
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showWarning") {
      showWarningPopup(message.data);
  }
});
