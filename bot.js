const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input i");
const chatbox = document.querySelector(".chatbox");
let userMessage;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    const span = document.createElement("span");
    span.textContent = message;
    chatLi.appendChild(span);

    return chatLi;
};

const handleChat = async () => {
    userMessage = chatInput.value.trim();
    if (userMessage === "") return;

    const outgoingChatLi = createChatLi(userMessage, "outgoing");
    chatbox.appendChild(outgoingChatLi);
    chatInput.value = ""; // Clear the input after sending the message

    // Display "Typing..." while waiting for a response
    const typingIndicator = createChatLi("Typing...", "incoming");
    chatbox.appendChild(typingIndicator);

    try {
        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 50
            })
        });

        const data = await response.json();
        const incomingChatLi = createChatLi(data.choices[0].text.trim(), "incoming");
        chatbox.replaceChild(incomingChatLi, typingIndicator);
    } catch (error) {
        console.error('Error:', error);
        const errorChatLi = createChatLi("Sorry, something went wrong. Please try again.", "incoming");
        chatbox.replaceChild(errorChatLi, typingIndicator);
    }
};

sendChatBtn.addEventListener("click", handleChat);

