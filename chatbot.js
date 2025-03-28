document.addEventListener("DOMContentLoaded", function() {
    const chatbot = document.getElementById("chatbot-container");
    const chatbotBtn = document.getElementById("chatbot-button");
    const closeBtn = document.getElementById("close-chatbot");
    const chatInput = document.getElementById("chatbot-input");
    const sendBtn = document.getElementById("send-btn");
    const chatContent = document.getElementById("chat-content");

    // Toggle chatbot visibility
    function toggleChatbot() {
        chatbot.classList.toggle("active");
        if(chatbot.classList.contains("active")) {
            scrollToBottom();
        }
    }

    chatbotBtn.addEventListener("click", toggleChatbot);
    closeBtn.addEventListener("click", toggleChatbot);

    // Auto-scroll to bottom
    function scrollToBottom() {
        setTimeout(() => {
            chatContent.scrollTop = chatContent.scrollHeight;
        }, 100);
    }

    // Send message function
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, "user");
            chatInput.value = "";
            scrollToBottom();
            
            try {
                showTypingIndicator();
                
                // Simulate API call
                setTimeout(() => {
                    hideTypingIndicator();
                    addMessage("Thank you for your message. Our team will get back to you shortly.", "bot");
                    scrollToBottom();
                }, 1000);
                
            } catch (error) {
                hideTypingIndicator();
                addMessage("Sorry, I'm having some technical issues. Please try again later.", "bot");
                console.error("Error:", error);
                scrollToBottom();
            }
        }
    }

    // Add message to chat
    function addMessage(text, sender) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `message ${sender}-message`;
        msgDiv.textContent = text;
        chatContent.appendChild(msgDiv);
    }

    // Typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement("div");
        typingDiv.id = "typing-indicator";
        typingDiv.className = "message bot-message";
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatContent.appendChild(typingDiv);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const typing = document.getElementById("typing-indicator");
        if (typing) typing.remove();
    }

    // Event listeners
    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    // Initial welcome message
    addMessage("Hello! I'm your Justice Assistant. How may I help you today?", "bot");
});