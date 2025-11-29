// Menú lateral
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');
const overlay = document.getElementById('overlay');

menuBtn.onclick = () => {
  sideMenu.classList.add('active');
  overlay.classList.add('active');
};
closeMenu.onclick = overlay.onclick = () => {
  sideMenu.classList.remove('active');
  overlay.classList.remove('active');
};

// Cambiar secciones
document.querySelectorAll('.side-menu li').forEach(item => {
  item.onclick = () => {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(item.dataset.section).classList.add('active');
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
  };
});

// Mensajes Firebase
const messageList = document.getElementById('messageList');
db.limitToLast(50).on('child_added', (snap) => {
  const m = snap.val();
  const div = document.createElement('div');
  div.className = 'message';
  div.innerHTML = `<strong>${m.name}</strong><p>${m.text.replace(/\n/g,'<br>')}</p><small>${new Date(m.date).toLocaleString('es-ES')}</small>`;
  messageList.prepend(div);
});

document.getElementById('sendMessage').onclick = () => {
  const name = document.getElementById('nameInput').value.trim() || "Anónimo ♥";
  const text = document.getElementById('messageInput').value.trim();
  if(text) {
    db.push({ name, text, date: Date.now() });
    document.getElementById('messageInput').value = "";
  }
};

// Cambiar canción
function changeSong(url, title) {
  const audio = document.getElementById('mainAudio');
  audio.src = url;
  audio.play();
  document.getElementById('currentSong').textContent = title + " ♪";
}