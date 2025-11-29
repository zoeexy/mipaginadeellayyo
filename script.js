// Música
const audio = document.getElementById('bgMusic');
const toggleBtn = document.getElementById('toggleMusic');
let isPlaying = false;

toggleBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    audio.play();
    toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }
  isPlaying = !isPlaying;
});

// Mensajes
const messageList = document.getElementById('messageList');
const nameInput = document.getElementById('nameInput');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendMessage');

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('loveMessages') || '[]');
  messageList.innerHTML = '';
  messages.forEach(msg => addMessageToDOM(msg));
}

function addMessageToDOM(msg) {
  const div = document.createElement('div');
  div.className = 'message';
  div.innerHTML = `
    <div class="author">${msg.name}</div>
    <div>${msg.text.replace(/\n/g, '<br>')}</div>
    <div class="date">${new Date(msg.date).toLocaleString('es-MX')}</div>
  `;
  messageList.prepend(div); // los más nuevos arriba
}

sendBtn.addEventListener('click', () => {
  const name = nameInput.value.trim() || 'Anónimo 💜';
  const text = messageInput.value.trim();
  if (text === '') return;

  const newMsg = {
    name,
    text,
    date: Date.now()
  };

  const messages = JSON.parse(localStorage.getItem('loveMessages') || '[]');
  messages.push(newMsg);
  localStorage.setItem('loveMessages', JSON.stringify(messages));

  addMessageToDOM(newMsg);
  messageInput.value = '';
});

// Cargar mensajes al inicio
loadMessages();