document.addEventListener("DOMContentLoaded", function () {
    const chatbot = document.getElementById("chatbot-container");
    const chatbotBtn = document.getElementById("chatbot-button");
    const closeBtn = document.getElementById("close-chatbot");
    const chatInput = document.getElementById("chatbot-input");
    const sendBtn = document.getElementById("send-btn");
    const chatContent = document.getElementById("chat-content");
  
    let isWaitingForResponse = false;
    let isFirstInteraction = true;
  
    function toggleChatbot() {
      chatbot.classList.toggle("active");
      if (chatbot.classList.contains("active")) {
        chatInput.focus();
      }
    }
  
    function isHindiText(text) {
      return /[\u0900-\u097F]/.test(text) || 
             ["namaste", "namaskar", "hindi", "हिंदी"].some(word => 
              text.toLowerCase().includes(word));
    }
  
    async function sendMessage() {
      const message = chatInput.value.trim();
      if (!message || isWaitingForResponse) return;
  
      addMessage(message, "user");
      chatInput.value = "";
      isWaitingForResponse = true;
      chatInput.disabled = true;
      sendBtn.disabled = true;
  
      // Handle first interaction
      if (isFirstInteraction) {
        isFirstInteraction = false;
        const isHindi = isHindiText(message);
        if (isHindi || ["hi", "hello", "hey"].some(greet => message.toLowerCase().includes(greet))) {
          addMessage(
            isHindi ? "👋 नमस्ते! मैं आपका न्याय सहायक हूँ। मैं आपकी कैसे मदद कर सकता हूँ?"
                    : "👋 Hello! I'm your Justice Assistant. How may I help you today?", 
            "bot"
          );
          isWaitingForResponse = false;
          chatInput.disabled = false;
          sendBtn.disabled = false;
          chatInput.focus();
          return;
        }
      }
  
      try {
        showTypingIndicator();
  
        const response = await fetch('https://justice-backend-rolw.onrender.com/chatbot/askQuestion', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ question: message })
        });
  
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
        const data = await response.json();
        hideTypingIndicator();
  
        if (data.results && data.results.length > 0) {
          data.results.forEach(result => {
            let responseText = result.title;
            if (result.description) responseText += `\n\n${result.description}`;
            if (result.link) responseText += `\n\n🔗 More info: <a href="${result.link}" target="_blank" class="chat-link">${result.link}</a>`;
            addMessage(responseText, "bot");
          });
        } else {
          addMessage(isHindiText(message) ? 
            "❌ क्षमा करें, मैं प्रासंगिक जानकारी नहीं ढूंढ पाया।" :
            "❌ Sorry, I couldn't find relevant information.", "bot");
        }
      } catch (error) {
        hideTypingIndicator();
        addMessage(isHindiText(message) ?
          "⚠️ क्षमा करें, कनेक्ट होने में समस्या हो रही है। कृपया बाद में पुनः प्रयास करें।" :
          "⚠️ Sorry, I'm having trouble connecting. Please try again later.", "bot");
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
      
      // Preserve line breaks and make links clickable
      const htmlText = text
        .replace(/\n/g, '<br>')
        .replace(/<a href/g, '<a class="chat-link" href');
      
      msgDiv.innerHTML = htmlText;
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
  
    // Event listeners
    chatbotBtn.addEventListener("click", toggleChatbot);
    closeBtn.addEventListener("click", toggleChatbot);
    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
});