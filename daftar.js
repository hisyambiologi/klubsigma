document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !email || !password) {
    alert('Mohon lengkapi semua data pendaftaran!');
    return;
  }

  if (password.length < 3) {
    alert('Kata sandi minimal 3 karakter!');
    return;
  }

  try {
    const response = await fetch('[herisusanta.my.id](https://herisusanta.my.id/javalogin/api/register)', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, email: email, password: password })
    });

    const data = await response.json();

    if (data.status === 'success') {
      alert('Pendaftaran berhasil! Identitas kamu telah diresmikan. Silakan masuk.');
      window.location.href = 'masuk.html';
    } else if (data.message && data.message.toLowerCase().includes('username')) {
      alert('Nama pengguna sudah digunakan! Pilih nama pengguna yang lain.');
    } else {
      alert('Pendaftaran gagal: ' + (data.message || 'Terjadi kesalahan. Coba lagi.'));
    }
  } catch (error) {
    alert('Gagal terhubung ke server. Periksa koneksi internet kamu dan coba lagi.');
    console.error('Register error:', error);
  }
});
