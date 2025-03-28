document.addEventListener("DOMContentLoaded", function() {
    const chatbot = document.getElementById("chatbot-container");
    const chatbotBtn = document.getElementById("chatbot-button");
    const closeBtn = document.getElementById("close-chatbot");
    const chatInput = document.getElementById("chatbot-input");
    const sendBtn = document.getElementById("send-btn");
    const chatContent = document.getElementById("chat-content");

    // Track chat state
    let isChatbotActive = false;
    let messageCount = 0;

    // Toggle chatbot with state management
    function toggleChatbot() {
        isChatbotActive = !isChatbotActive;
        chatbot.classList.toggle("active");
        if (isChatbotActive) {
            setTimeout(() => chatInput.focus(), 100);
        }
    }

    // Event delegation for reliable handling
    document.body.addEventListener('click', function(e) {
        if (e.target === chatbotBtn || e.target.closest('#chatbot-button')) {
            toggleChatbot();
        }
        if (e.target === closeBtn || e.target.closest('#close-chatbot')) {
            toggleChatbot();
        }
        if (e.target === sendBtn || e.target.closest('#send-btn')) {
            sendMessage();
        }
    });

    // Robust message handling
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, "user");
        chatInput.value = "";
        messageCount++;
        
        try {
            showTypingIndicator();
            
            // API call
            const response = await fetch('https://justice-backend-rolw.onrender.com/chatbot/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: message })
            });
            
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            hideTypingIndicator();
            
            if (data.results?.length > 0) {
                data.results.forEach(result => {
                    addMessage(`${result.title}\n${result.description || result.link || ''}`, "bot");
                });
            } else {
                addMessage("I couldn't find relevant information. Please try another question.", "bot");
            }
        } catch (error) {
            hideTypingIndicator();
            addMessage("Sorry, I'm having trouble connecting. Please try again later.", "bot");
            console.error("Chatbot Error:", error);
        } finally {
            // Always ensure input is ready for next message
            chatInput.focus();
            chatInput.disabled = false;
            sendBtn.disabled = false;
        }
    }

    // Improved message addition
    function addMessage(text, sender) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `message ${sender}-message`;
        msgDiv.textContent = text;
        
        // Ensure chat content is scrollable
        chatContent.style.overflowY = 'auto';
        chatContent.appendChild(msgDiv);
        
        // Smooth scroll to bottom
        setTimeout(() => {
            chatContent.scrollTo({
                top: chatContent.scrollHeight,
                behavior: 'smooth'
            });
        }, 50);
    }

    // Typing indicator functions
    function showTypingIndicator() {
        if (document.getElementById("typing-indicator")) return;
        
        const typingDiv = document.createElement("div");
        typingDiv.className = "typing-indicator";
        typingDiv.id = "typing-indicator";
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatContent.appendChild(typingDiv);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    function hideTypingIndicator() {
        const typing = document.getElementById("typing-indicator");
        if (typing) typing.remove();
    }

    // Input handling
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    // Initial welcome message
    setTimeout(() => {
        addMessage("Hello! I'm your Justice Assistant. How may I help you today?", "bot");
    }, 1000);
});