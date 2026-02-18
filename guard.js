const adminEmails = [
  "dwiki.alfitrah070101@gmail.com"
];

firebase.auth().onAuthStateChanged(function(user) {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const isAdmin = adminEmails.includes(user.email);
  const currentPage = window.location.pathname;

  // Jika user biasa buka dashboard-admin
  if (currentPage.includes("dashboard-admin") && !isAdmin) {
    window.location.href = "dashboard-user.html";
    return;
  }

  // Jika admin buka dashboard-user
  if (currentPage.includes("dashboard-user") && isAdmin) {
    window.location.href = "dashboard-admin.html";
    return;
  }

  // Jika lolos semua pengecekan, tampilkan halaman
  document.body.style.display = "block";
});

