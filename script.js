document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send-btn");
    const endButton = document.getElementById("end-btn");
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    sendButton.addEventListener("click", () => {
        const message = userInput.value.trim();
        if (message) {
            addMessage("user", message);
            userInput.value = "";

            fetch("/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            })
            .then(response => response.json())
            .then(data => {
                addMessage("bot", data.reply);
            })
            .catch(error => {
                console.error("Error:", error);
                addMessage("bot", "Sorry, something went wrong.");
            });
        }
    });

    endButton.addEventListener("click", () => {
        addMessage("bot", "Chat ended. Refresh the page to start a new conversation.");
        sendButton.disabled = true;
        userInput.disabled = true;
    });

    function addMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
