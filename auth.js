/* =====================================================
   AUTH.JS – SATPEL PARIAMAN
   Login, Logout, Session Handling (AMAN)
   ===================================================== */

/* =======================
   LOGIN
   ======================= */
function login() {
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const errorEl = document.getElementById("error");

  if (!emailEl || !passwordEl) {
    console.error("Elemen email/password tidak ditemukan");
    return;
  }

  const email = emailEl.value.trim();
  const password = passwordEl.value.trim();

  if (email === "" || password === "") {
    if (errorEl) {
      errorEl.innerText = "Email dan password wajib diisi";
    }
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      /* 
        Pakai replace supaya:
        - Tidak bisa kembali ke login via tombol Back
      */
      window.location.replace("dashboard-user.html");
    })
    .catch((error) => {
      if (errorEl) {
        errorEl.innerText = "Email atau password salah";
      }
      console.error("Login error:", error.code);
    });
}

/* =======================
   LOGOUT (AMAN)
   ======================= */
function logout() {
  firebase.auth().signOut()
    .then(() => {
      /*
        replace() = tidak bisa kembali ke dashboard
      */
      window.location.replace("index.html");
    })
    .catch((error) => {
      console.error("Logout error:", error);
      alert("Logout gagal, silakan coba lagi.");
    });
}

/* =======================
   PROTEKSI TAMBAHAN (OPSIONAL)
   Mencegah halaman dashboard
   ditampilkan dari cache browser
   ======================= */
(function preventBackCache() {
  if (window.history && window.history.pushState) {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }
})();
