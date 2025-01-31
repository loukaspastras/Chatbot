// chat-utils.js

function sendMessageToServer(message) {
    return new Promise((resolve, reject) => {
        fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            resolve(data);  // Resolve with the server's response
        })
        .catch(error => {
            reject(error);  // Reject on error
        });
    });
}
