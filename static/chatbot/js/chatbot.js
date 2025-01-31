// chatbot.js

document.addEventListener("DOMContentLoaded", function () {
    // Load chatbot.html dynamically
    fetch("/static/chatbot/chatbot.html")
        .then(response => response.text())
        .then(html => {
            let chatbotDiv = document.createElement("div");
            chatbotDiv.innerHTML = html;
            document.body.appendChild(chatbotDiv);

            // Load chatbot.css
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "/static/chatbot/chatbot.css";
            document.head.appendChild(link);

            // Event listeners for opening and minimizing the chat window
            document.getElementById("chatbot-logo").addEventListener("click", function () {
                document.getElementById("chatbot-container").style.display = "block";
                document.getElementById("chatbot-logo").style.display = "none";
            });

            document.getElementById("minimize-btn").addEventListener("click", function () {
                document.getElementById("chatbot-container").style.display = "none";
                document.getElementById("chatbot-logo").style.display = "block";
            });

            // Initialize sending message functionality
            initSendMessage();
        })
        .catch(error => console.error("Error loading chatbot:", error));
});

function initSendMessage() {
    // Get the send button and input element
    let sendButton = document.getElementById("send-btn");
    let inputElement = document.getElementById("chat-input");

    // Attach event listener for "Send" button
    sendButton.addEventListener("click", sendMessage);

    // Attach event listener for "Enter" key in the input field
    inputElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();  // Prevent default behavior (new line in input)
            sendMessage();
        }
    });
}

function sendMessage() {
    let inputElement = document.getElementById("chat-input");
    let message = inputElement.value.trim();
    if (message === '') return;  // Avoid sending empty messages

    // Display user message
    let chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML += `<div class="user-message">${message}</div>`;

    // Send message to Flask API
    sendMessageToServer(message).then(data => {
        // Display bot's response
        chatMessages.innerHTML += `<div class="bot-message">${data.message}</div>`;
        inputElement.value = '';  // Clear input field
        chatMessages.scrollTop = chatMessages.scrollHeight;  // Scroll to the latest message
    }).catch(error => {
        console.error('Error:', error);
    });
}
