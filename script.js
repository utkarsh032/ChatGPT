const chatInput = document.querySelector('#chat-input');
const sendButton = document.querySelector('#send-btn');
const chatContainer = document.querySelector('.chat-container');

let userText = null;

const createElement = (html, className) => {
  const chatDiv = document.createElement('div');
  chatDiv.classList.add('chat', className);
  chatDiv.innerHTML = html;
  return chatDiv;
};

const handleOutGoingChat = () => {
  userText = chatInput.value.trim();
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
};

sendButton.addEventListener('click', handleOutGoingChat);
