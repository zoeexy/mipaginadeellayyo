// Bienvenida cada vez
window.addEventListener('load', () => {
  document.getElementById('welcomeModal').classList.add('active');
});
document.getElementById('closeWelcome').onclick = () => {
  document.getElementById('welcomeModal').classList.remove('active');
};

// Corazones al click
document.addEventListener('click', e => {
  const h = document.createElement('div');
  h.className = 'heart-click';
  h.innerHTML = '♥';
  h.style.left = (e.clientX - 20) + 'px';
  h.style.top = (e.clientY - 20) + 'px';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 3000);
});

// SUBIR FOTOS (AHORA SÍ FUNCIONA)
document.getElementById('addPhotoBtn').onclick = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;

    const ref = storage.child('fotos/' + Date.now() + '_' + file.name);
    const uploadTask = ref.put(file);

    uploadTask.then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        galeriaDB.push(url);  // Guarda la URL en la base de datos
      });
    }).catch(err => console.error("Error subiendo foto:", err));
  };
  input.click();
};

// CARGAR FOTOS NUEVAS
galeriaDB.on('child_added', snap => {
  const url = snap.val();
  if (url && !document.querySelector(`img[src="${url}"]`)) { // evita duplicados
    const img = document.createElement('img');
    img.src = url;
    img.alt = "Nuestra foto";
    document.getElementById('photoGrid').prepend(img);
  }
});

// Menú, mensajes y música (igual)
document.getElementById('menuBtn').onclick = () => document.getElementById('sideMenu').classList.toggle('active');
document.querySelectorAll('.side-menu li').forEach(item => {
  item.onclick = () => {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.side-menu li').forEach(li => li.classList.remove('active'));
    document.getElementById(item.dataset.section).classList.add('active');
    item.classList.add('active');
    if(window.innerWidth <= 900) document.getElementById('sideMenu').classList.remove('active');
  };
});

db.limitToLast(50).on('child_added', s => {
  const m = s.val();
  const d = document.createElement('div');
  d.innerHTML = `<strong>${m.name} </strong><p>${m.text.replace(/\n/g,'<br>')}</p><small>${new Date(m.date).toLocaleString('es-ES')}</small>`;
  document.getElementById('messageList').prepend(d);
});

document.getElementById('sendMessage').onclick = () => {
  const n = document.getElementById('nameInput').value.trim() || "Amor";
  const t = document.getElementById('messageInput').value.trim();
  if(t) { db.push({name:n, text:t, date:Date.now()}); document.getElementById('messageInput').value = ""; }
};

function play(u,t){ 
  const a = document.getElementById('mainAudio'); 
  a.src = u; a.play(); 
  document.getElementById('currentSong').textContent = t + " "; 
}