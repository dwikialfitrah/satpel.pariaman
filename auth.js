// ===============================
// DAFTAR EMAIL ADMIN
// ===============================
const adminEmails = [
  "dwiki.alfitrah070101@gmail.com",
];


// ===============================
// AUTO REDIRECT JIKA SUDAH LOGIN
// ===============================
firebase.auth().onAuthStateChanged(function(user) {

  if (user && window.location.pathname.includes("login.html")) {

    if (adminEmails.includes(user.email)) {
      window.location.replace("dashboard-admin.html");
    } else {
      window.location.replace("dashboard-user.html");
    }
  }
});


// ===============================
// LOGIN FUNCTION
// ===============================
function login() {

  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const errorEl = document.getElementById("error");
  const button = document.querySelector("button[type='submit']");

  if (!emailEl || !passwordEl) {
    console.error("Elemen email/password tidak ditemukan");
    return;
  }

  const email = emailEl.value.trim();
  const password = passwordEl.value.trim();

  if (email === "" || password === "") {
    errorEl.innerText = "Email dan password wajib diisi";
    return;
  }

  button.disabled = true;
  button.innerText = "Memproses...";

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {

      const user = userCredential.user;

      if (adminEmails.includes(user.email)) {
        window.location.replace("dashboard-admin.html");
      } else {
        window.location.replace("dashboard-user.html");
      }

    })
    .catch(function(error) {

      switch (error.code) {

        case "auth/user-not-found":
          errorEl.innerText = "Email tidak terdaftar";
          break;

        case "auth/wrong-password":
          errorEl.innerText = "Password salah";
          break;

        case "auth/invalid-email":
          errorEl.innerText = "Format email tidak valid";
          break;

        case "auth/too-many-requests":
          errorEl.innerText = "Terlalu banyak percobaan. Coba lagi nanti.";
          break;

        default:
          errorEl.innerText = "Terjadi kesalahan. Coba lagi.";
      }

      console.error("Login error:", error.code);

      button.disabled = false;
      button.innerText = "Masuk";
    });
}


// ===============================
// LOGOUT FUNCTION
// ===============================
function logout() {
  firebase.auth().signOut()
    .then(function() {
      window.location.replace("index.html");
    })
    .catch(function(error) {
      console.error("Logout error:", error);
      alert("Logout gagal.");
    });
}


// ===============================
// PREVENT BACK BUTTON
// ===============================
(function preventBackCache() {
  if (window.history && window.history.pushState) {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }
})();
