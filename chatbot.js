document.addEventListener("DOMContentLoaded", function() {
    const chatbot = document.getElementById("chatbot-container");
    const chatbotBtn = document.getElementById("chatbot-button");
    const closeBtn = document.getElementById("close-chatbot");
    const chatInput = document.getElementById("chatbot-input");
    const sendBtn = document.getElementById("send-btn");
    const chatContent = document.getElementById("chat-content");

    
    let isWaitingForResponse = false;

    
    function toggleChatbot() {
        chatbot.classList.toggle("active");
        if (chatbot.classList.contains("active")) {
            chatInput.focus();
        }
    }

    
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message || isWaitingForResponse) return;

        
        addMessage(message, "user");
        chatInput.value = "";
        isWaitingForResponse = true;
        chatInput.disabled = true;
        sendBtn.disabled = true;
        
        try {
            showTypingIndicator();
            
            
            const response = await fetch('https://justice-backend-rolw.onrender.com/chatbot/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: message })
            });
            
            const data = await response.json();
            hideTypingIndicator();
            
            if (data.results && data.results.length > 0) {
                data.results.forEach(result => {
                    addMessage(`${result.title}\n${result.description || result.link || ''}`, "bot");
                });
            } else {
                addMessage("I couldn't find relevant information. Please try another question.", "bot");
            }
            
        } catch (error) {
            hideTypingIndicator();
            addMessage("Sorry, I'm having trouble connecting. Please try again later.", "bot");
            console.error("Error:", error);
        } finally {
            isWaitingForResponse = false;
            chatInput.disabled = false;
            sendBtn.disabled = false;
            chatInput.focus();
        }
    }

    
    function addMessage(text, sender) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `message ${sender}-message`;
        msgDiv.textContent = text;
        chatContent.appendChild(msgDiv);
        scrollToBottom();
    }

    
    function showTypingIndicator() {
        const typingDiv = document.createElement("div");
        typingDiv.className = "typing-indicator";
        typingDiv.id = "typing-indicator";
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

    
    function scrollToBottom() {
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    
    chatbotBtn.addEventListener("click", toggleChatbot);
    closeBtn.addEventListener("click", toggleChatbot);
    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    
    setTimeout(() => {
        addMessage("Hello! I'm your Justice Assistant. How may I help you today?", "bot");
    }, 500);
});