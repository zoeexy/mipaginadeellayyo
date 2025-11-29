// Mostrar mensaje de bienvenida solo la primera vez
if (!localStorage.getItem('visited')) {
  document.getElementById('welcomeModal').classList.add('active');
  localStorage.setItem('visited', 'true');
}
document.getElementById('closeWelcome').onclick = () => {
  document.getElementById('welcomeModal').classList.remove('active');
};

// Corazones al hacer click en cualquier parte
document.addEventListener('click', function(e) {
  const heart = document.createElement('div');
  heart.classList.add('heart-click');
  heart.innerHTML = '♥';
  heart.style.left = (e.clientX - 20) + 'px';
  heart.style.top = (e.clientY - 20) + 'px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
});

// Menú móvil
document.getElementById('menuBtn').onclick = () => {
  document.getElementById('sideMenu').classList.toggle('active');
};

// Cambiar secciones
document.querySelectorAll('.side-menu li').forEach(item => {
  item.onclick = () => {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.side-menu li').forEach(li => li.classList.remove('active'));
    document.getElementById(item.dataset.section).classList.add('active');
    item.classList.add('active');
    if(window.innerWidth <= 900) {
      document.getElementById('sideMenu').classList.remove('active');
    }
  };
});

// Mensajes Firebase
db.limitToLast(50).on('child_added', snap => {
  const m = snap.val();
  const div = document.createElement('div');
  div.innerHTML = `<strong>${m.name} ♡</strong><p>${m.text.replace(/\n/g,'<br>')}</p><small>${new Date(m.date).toLocaleString('es-ES')}</small>`;
  document.getElementById('messageList').prepend(div);
});

document.getElementById('sendMessage').onclick = () => {
  const name = document.getElementById('nameInput').value.trim() || "Amor";
  const text = document.getElementById('messageInput').value.trim();
  if(text) {
    db.push({name, text, date: Date.now()});
    document.getElementById('messageInput').value = "";
  }
};

// Música
function play(url, title) {
  const audio = document.getElementById('mainAudio');
  audio.src = url;
  audio.play();
  document.getElementById('currentSong').textContent = title + " ♪";
}