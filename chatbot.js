document.addEventListener("DOMContentLoaded", function () {
    const chatbot = document.getElementById("chatbot-container");
    const chatbotBtn = document.getElementById("chatbot-button");
    const chatInput = document.getElementById("chatbot-input");
    const sendBtn = document.getElementById("send-btn");
    const chatContent = document.getElementById("chat-content");

    // Chatbot toggle
    chatbotBtn.addEventListener("click", function () {
        chatbot.classList.toggle("active");
    });

    // Function to send message
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (message !== "") {
            appendMessage("You: " + message, "user-message");

            try {
                const response = await fetch('https://justice-backend-rolw.onrender.com/chatbot/ask', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ question: message }),
                });

                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    data.results.forEach(result => {
                        appendMessage(`Bot: <strong>${result.title}</strong> - ${result.description || result.link || ''}`, "bot-message");
                    });
                } else {
                    appendMessage("Bot: No results found.", "bot-message");
                }
            } catch (error) {
                appendMessage("Bot: Server error occurred.", "bot-message");
            }

            chatInput.value = "";
            chatContent.scrollTop = chatContent.scrollHeight;
        }
    }

    // Function to append messages to chat content
    function appendMessage(message, className) {
        const messageElement = document.createElement("p");
        messageElement.classList.add(className);
        messageElement.innerHTML = message;
        chatContent.appendChild(messageElement);
    }

    // Send button click event
    sendBtn.addEventListener("click", sendMessage);

    // Enter key press event
    chatInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") sendMessage();
    });
});
