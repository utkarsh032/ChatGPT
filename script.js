const chatInput = document.querySelector('#chat-input');
const sendButton = document.querySelector('#send-btn');
const chatContainer = document.querySelector('.chat-container');

let userText = null;
const RAPIDAPI_HOST = 'chat-gpt26.p.rapidapi.com';
const RAPIDAPI_KEY = 'd77ccd0640msh93573b429f0c962p1521d6jsnea3af6a3d486';

const createElement = (html, className) => {
  const chatDiv = document.createElement('div');
  chatDiv.classList.add('chat', className);
  chatDiv.innerHTML = html;
  return chatDiv;
};

const getChatResponse = async () => {
  const API_URL = 'https://chat-gpt26.p.rapidapi.com/';
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': RAPIDAPI_HOST,
      'x-rapidapi-key': RAPIDAPI_KEY,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userText }],
    }),
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const botText = data.choices[0]?.message.content.trim() || "I couldn't generate a response.";
    const html = `
      <div class="chat-content">
        <div class="chat-details">
          <img src="./img/chatgpt-6.svg" alt="GPT">
          <p>${botText}</p>
        </div>
           <span class="material-symbols-outlined">
          content_copy
        </span>
      </div>
    `;

    const incomingChatDiv = createElement(html, 'incoming');
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  } catch (error) {
    console.error('Error:', error.message);
    const errorHtml = `
      <div class="chat-content">
        <div class="chat-details">
          <p>Something went wrong. Please try again.</p>
        </div>
      </div>
    `;
    const errorDiv = createElement(errorHtml, 'incoming');
    chatContainer.appendChild(errorDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
};

const showTypingAnimation = () => {
  const html = `
      <div class="chat-content typing">
        <div class="chat-details">
          <img src="./img/chatgpt-6.svg" alt="GPT">
          <div class="typing-animation">
            <div class="typing-dot" style="--delay:0.2s"></div>
            <div class="typing-dot" style="--delay:0.3s"></div>
            <div class="typing-dot" style="--delay:0.4s"></div>
          </div>
        </div>
      </div>
  `;
  const typingDiv = createElement(html, 'incoming');
  chatContainer.appendChild(typingDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  return typingDiv;
};

const handleOutGoingChat = () => {
  userText = chatInput.value.trim();
  if (!userText) return;

  const html = `
    <div class="chat-content">
      <div class="chat-details">
        <span class="material-symbols-outlined">
          edit
        </span>
        <p>${userText}</p>
        <img src="./img/user.jpeg" alt="user">
      </div>
    </div>
  `;

  const outGoingChatDiv = createElement(html, 'outgoing');
  chatContainer.appendChild(outGoingChatDiv);

  chatContainer.scrollTop = chatContainer.scrollHeight;
  chatInput.value = '';

  const typingDiv = showTypingAnimation();
  setTimeout(() => {
    chatContainer.removeChild(typingDiv);
    getChatResponse();
  }, 1000);
};

sendButton.addEventListener('click', handleOutGoingChat);
