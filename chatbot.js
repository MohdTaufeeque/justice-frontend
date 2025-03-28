document.addEventListener("DOMContentLoaded", function() {
    const chatbot = document.getElementById("chatbot-container");
    const chatInput = document.getElementById("chatbot-input");
    const sendBtn = document.getElementById("send-btn");
    const chatContent = document.getElementById("chat-content");

    // Toggle chatbot
    document.getElementById("chatbot-button").addEventListener("click", () => chatbot.classList.add("active"));
    document.getElementById("close-chatbot").addEventListener("click", () => chatbot.classList.remove("active"));

    // Always-working message function
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        const userMsg = document.createElement("div");
        userMsg.className = "message user-message";
        userMsg.textContent = message;
        chatContent.appendChild(userMsg);
        chatInput.value = "";
        
        // Add typing indicator
        const typing = document.createElement("div");
        typing.className = "typing-indicator";
        typing.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
        chatContent.appendChild(typing);
        
        // Scroll to bottom
        chatContent.scrollTop = chatContent.scrollHeight;
        
        // Simulate API response (remove this in production)
        setTimeout(() => {
            typing.remove();
            const botMsg = document.createElement("div");
            botMsg.className = "message bot-message";
            botMsg.textContent = "This is a test response to message #" + (document.querySelectorAll(".message").length/2);
            chatContent.appendChild(botMsg);
            chatContent.scrollTop = chatContent.scrollHeight;
        }, 1500);
    }

    // Event listeners
    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => e.key === "Enter" && sendMessage());
    
    // Initial message
    setTimeout(() => {
        const welcomeMsg = document.createElement("div");
        welcomeMsg.className = "message bot-message";
        welcomeMsg.textContent = "Hello! I'm your Justice Assistant. How may I help you today?";
        chatContent.appendChild(welcomeMsg);
    }, 500);
});