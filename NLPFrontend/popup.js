document.addEventListener("DOMContentLoaded", () => {
    const responseMessage = document.getElementById("responseMessage");
    const closeButton = document.getElementById("closePopup");
    console.log("ResponseMessage" , responseMessage.textContent)
    // Retrieve the response from storage
    chrome.storage.local.get("lastResponse", (data) => {
      if (data.lastResponse) {
        responseMessage.textContent = data.lastResponse.message;
      } else {
        responseMessage.textContent = "No recent notifications.";
      }
    });
  
    // Close the popup
    closeButton.addEventListener("click", () => {
      window.close();
    });
  });
  