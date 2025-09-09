function loadChatbot(apiUrl) {
  // Create chatbot button
  const openBtn = document.createElement("div");
  openBtn.innerHTML = "💬";
  openBtn.style.position = "fixed";
  openBtn.style.bottom = "20px";
  openBtn.style.right = "20px";
  openBtn.style.background = "#0078D7";
  openBtn.style.color = "white";
  openBtn.style.width = "50px";
  openBtn.style.height = "50px";
  openBtn.style.borderRadius = "50%";
  openBtn.style.display = "flex";
  openBtn.style.justifyContent = "center";
  openBtn.style.alignItems = "center";
  openBtn.style.fontSize = "24px";
  openBtn.style.cursor = "pointer";
  openBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
  openBtn.style.zIndex = "9999";

  // Chatbox container
  const chatbot = document.createElement("div");
  chatbot.style.position = "fixed";
  chatbot.style.bottom = "80px";
  chatbot.style.right = "20px";
  chatbot.style.width = "300px";
  chatbot.style.height = "400px";
  chatbot.style.background = "#fff";
  chatbot.style.border = "1px solid #ccc";
  chatbot.style.borderRadius = "10px";
  chatbot.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  chatbot.style.display = "none";
  chatbot.style.flexDirection = "column";
  chatbot.style.zIndex = "9999";

  // Chat header
  const header = document.createElement("div");
  header.textContent = "Chatbot 🤖";
  header.style.background = "#0078D7";
  header.style.color = "white";
  header.style.padding = "10px";
  header.style.borderTopLeftRadius = "10px";
  header.style.borderTopRightRadius = "10px";
  header.style.fontWeight = "bold";
  chatbot.appendChild(header);

  // Chat area
  const chatArea = document.createElement("div");
  chatArea.style.flex = "1";
  chatArea.style.padding = "10px";
  chatArea.style.overflowY = "auto";
  chatArea.style.fontFamily = "Arial, sans-serif";
  chatbot.appendChild(chatArea);

  // Input box
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Type your message...";
  input.style.border = "none";
  input.style.padding = "10px";
  input.style.fontSize = "14px";
  input.style.borderTop = "1px solid #ccc";
  chatbot.appendChild(input);

  // Add chatbot to body
  document.body.appendChild(chatbot);
  document.body.appendChild(openBtn);

  // Toggle chatbot visibility
  openBtn.addEventListener("click", () => {
    chatbot.style.display = chatbot.style.display === "none" ? "flex" : "none";
  });

  // Send message on Enter
  input.addEventListener("keypress", async (e) => {
    if (e.key === "Enter" && input.value.trim() !== "") {
      const userMsg = input.value;
      const userDiv = document.createElement("div");
      userDiv.textContent = `You: ${userMsg}`;
      userDiv.style.color = "#333";
      chatArea.appendChild(userDiv);

      input.value = "";

      // Fetch response from Django API
      try {
        const res = await fetch(`${apiUrl}?q=${encodeURIComponent(userMsg)}`);
        const data = await res.json();
        const botDiv = document.createElement("div");
        botDiv.textContent = `Bot: ${data.answer}`;
        botDiv.style.color = "#0078D7";
        chatArea.appendChild(botDiv);
        chatArea.scrollTop = chatArea.scrollHeight;
      } catch (err) {
        const errorDiv = document.createElement("div");
        errorDiv.textContent = "Error connecting to chatbot 😢";
        errorDiv.style.color = "red";
        chatArea.appendChild(errorDiv);
      }
    }
  });
}
