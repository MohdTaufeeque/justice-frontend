document.addEventListener("DOMContentLoaded", function() {
    const chatbot = document.getElementById("chatbot-container");
    const chatbotBtn = document.getElementById("chatbot-button");
    const chatInput = document.getElementById("chatbot-input");
    const sendBtn = document.getElementById("send-btn");
    const chatContent = document.getElementById("chat-content");

    // Toggle chatbot visibility
    chatbotBtn.addEventListener("click", function() {
        chatbot.classList.toggle("active");
    });

    // Function to send message
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, "user");
            
            // Clear input
            chatInput.value = "";
            
            try {
                // Show typing indicator
                addTypingIndicator();
                
                // Send to backend
                const response = await fetch('https://justice-backend-rolw.onrender.com/chatbot/ask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ question: message })
                });
                
                const data = await response.json();
                
                // Remove typing indicator
                removeTypingIndicator();
                
                if (data.results && data.results.length > 0) {
                    data.results.forEach(result => {
                        addMessage(`${result.title}\n${result.description || result.link || ''}`, "bot");
                    });
                } else {
                    addMessage("I couldn't find relevant information. Can you please rephrase your question?", "bot");
                }
            } catch (error) {
                removeTypingIndicator();
                addMessage("Sorry, I'm having trouble connecting to the server. Please try again later.", "bot");
                console.error("Error:", error);
            }
        }
    }

    // Helper function to add messages
    function addMessage(text, sender) {
        const messageElement = document.createElement("p");
        messageElement.classList.add(sender + "-message");
        messageElement.textContent = text;
        chatContent.appendChild(messageElement);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    // Typing indicator functions
    function addTypingIndicator() {
        const typingElement = document.createElement("div");
        typingElement.id = "typing-indicator";
        typingElement.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
        chatContent.appendChild(typingElement);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingElement = document.getElementById("typing-indicator");
        if (typingElement) {
            typingElement.remove();
        }
    }

    // Event listeners
    sendBtn.addEventListener("click", sendMessage);
    
    chatInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    // Initial bot message
    addMessage("Hello! I'm your Justice Department assistant. How can I help you today?", "bot");
});