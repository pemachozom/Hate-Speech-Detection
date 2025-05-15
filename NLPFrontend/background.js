console.log("Background script loaded!");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "sendToAPI") {
        console.log("RUNNING BG>JS");
        const textData = String(message.data); // Ensure textData is a string

        const apiUrl = "http://10.9.90.205:5000/predict"; // Replace with your Flask API URL

        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: textData }), // Send the text data as JSON
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to communicate with the API.");
                }
                return response.json();
            })
            .then((apiResponse) => {
                console.log("API Response:", apiResponse.predicted_class);

                if (apiResponse.predicted_class !== "Not Hate") {
                  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                      if (tabs.length > 0) {
                          chrome.tabs.sendMessage(tabs[0].id, {
                              action: "showWarning",
                              data: 
                                  apiResponse.predicted_class.charAt(0).toUpperCase() + 
                                  apiResponse.predicted_class.slice(1) + 
                                  " Content Warning ⚠️, Viewer Discretion is Advised",
                          });
                      }
                  });
              }
              
            })
            .catch((error) => {
                console.error("Error communicating with the API:", error);
            });
    }
});
