document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('Mohon isi semua kolom terlebih dahulu!');
    return;
  }

  try {
    const response = await fetch('[herisusanta.my.id](https://herisusanta.my.id/javalogin/api/)', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    });

    const data = await response.json();

    if (data.status === 'success') {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('username', data.username || username);
      alert('Selamat datang, ' + (data.username || username) + '! Kamu telah berhasil masuk ke Sigma Club.');
      window.location.href = 'index.html';
    } else {
      alert('Nama pengguna atau kata sandi salah. Coba lagi!');
    }
  } catch (error) {
    alert('Gagal terhubung ke server. Periksa koneksi internet kamu dan coba lagi.');
    console.error('Login error:', error);
  }
});
