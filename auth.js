// ===== LOGIN =====
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
    .then((userCredential) => {

      const user = userCredential.user;

      // ===== ROLE CHECK SEDERHANA =====
      // Ganti email ini dengan email admin Anda
      const adminEmail = "admin@email.com";

      if (user.email === adminEmail) {
        window.location.replace("dashboard-admin.html");
      } else {
        window.location.replace("dashboard-user.html");
      }

    })
    .catch((error) => {
      if (errorEl) {
        errorEl.innerText = "Email atau password salah";
      }
      console.error("Login error:", error.code);
    });
}


// ===== LOGOUT (VERSI AMAN) =====
function logout() {
  firebase.auth().signOut()
    .then(() => {
      window.location.replace("index.html");
    })
    .catch((error) => {
      console.error("Logout error:", error);
      alert("Logout gagal, silakan coba lagi.");
    });
}


// ===== PREVENT BACK BUTTON =====
(function preventBackCache() {
  if (window.history && window.history.pushState) {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }
})();
