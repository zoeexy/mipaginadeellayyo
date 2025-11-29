// Música
const audio = document.getElementById('bgMusic');
const toggleBtn = document.getElementById('toggleMusic');
let playing = true;
toggleBtn.addEventListener('click', () => {
  if (playing) { audio.pause(); toggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; }
  else { audio.play(); toggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>'; }
  playing = !playing;
});

// Cargar y mostrar mensajes en tiempo real
const messageList = document.getElementById('messageList');
db.limitToLast(50).on('child_added', (snapshot) => {
  const msg = snapshot.val();
  addMessage(msg);
});

function addMessage(msg) {
  const div = document.createElement('div');
  div.className = 'message';
  div.innerHTML = `
    <div class="author">${msg.name}</div>
    <div>${msg.text.replace(/\n/g, '<br>')}</div>
    <div class="date">${new Date(msg.date).toLocaleString('es-ES')}</div>
  `;
  messageList.prepend(div);
}

// Enviar mensaje
document.getElementById('sendMessage').addEventListener('click', () => {
  const name = document.getElementById('nameInput').value.trim() || "Anónimo ♥";
  const text = document.getElementById('messageInput').value.trim();
  if (!text) return;
  db.push({
    name,
    text,
    date: Date.now()
  });
  document.getElementById('messageInput').value = "";
});

// Corazones flotantes al hacer click
const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
document.addEventListener('click', (e) => {
  for(let i = 0; i < 8; i++) {
    hearts.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 35 + 20,
      speedX: Math.random() * 4 - 2,
      speedY: Math.random() * -5 - 1,
      opacity: 1
    });
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((h, i) => {
    ctx.font = h.size + 'px Arial';
    ctx.fillStyle = `rgba(255, ${105 + Math.random()*100}, 200, ${h.opacity})`;
    ctx.fillText('♥', h.x, h.y);
    h.x += h.speedX;
    h.y += h.speedY;
    h.opacity -= 0.012;
    if (h.opacity <= 0) hearts.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});