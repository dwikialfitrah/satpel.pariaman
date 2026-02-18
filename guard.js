// ===============================
// DAFTAR EMAIL ADMIN (HARUS SAMA DENGAN auth.js)
// ===============================
const adminEmails = [
  "admin1@email.com",
  "admin2@email.com"
];


// ===============================
// GUARD PROTECTION
// ===============================
firebase.auth().onAuthStateChanged(function(user) {

  if (!user) {
    window.location.replace("index.html");
    return;
  }

  const currentPage = window.location.pathname;

  const isAdmin = adminEmails.includes(user.email);

  // Jika user biasa mencoba akses dashboard admin
  if (currentPage.includes("dashboard-admin.html") && !isAdmin) {
    window.location.replace("dashboard-user.html");
    return;
  }

  // Jika admin membuka dashboard user
  if (currentPage.includes("dashboard-user.html") && isAdmin) {
    window.location.replace("dashboard-admin.html");
    return;
  }

});
