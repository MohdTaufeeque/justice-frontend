document.addEventListener("DOMContentLoaded", function() {
    const chatbot = document.getElementById("chatbot-container");
    const chatbotBtn = document.getElementById("chatbot-button");
    const closeBtn = document.getElementById("close-chatbot");
    const chatInput = document.getElementById("chatbot-input");
    const sendBtn = document.getElementById("send-btn");
    const chatContent = document.getElementById("chat-content");

    // चैटबॉट टॉगल फंक्शन
    function toggleChatbot() {
        chatbot.classList.toggle("active");
    }

    chatbotBtn.addEventListener("click", toggleChatbot);
    closeBtn.addEventListener("click", toggleChatbot);

    // मैसेज भेजने का फंक्शन (बिना ऑटो-स्क्रॉल के)
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, "user");
            chatInput.value = "";
            
            try {
                showTypingIndicator();
                
                // बैकेंड को रिक्वेस्ट भेजें (आपका मूल API)
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
            }
        }
    }

    // मैसेज जोड़ने का फंक्शन
    function addMessage(text, sender) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `message ${sender}-message`;
        msgDiv.textContent = text;
        chatContent.appendChild(msgDiv);
    }

    // टाइपिंग इंडिकेटर फंक्शन
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
    }

    function hideTypingIndicator() {
        const typing = document.getElementById("typing-indicator");
        if (typing) typing.remove();
    }

    // इवेंट लिस्नर्स
    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    // वेलकम मैसेज
    setTimeout(() => {
        addMessage("Hello! I'm your Justice Assistant. How may I help you today?", "bot");
    }, 500);
});