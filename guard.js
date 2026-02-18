const adminEmails = [
  "dwiki.alfitrah070101@gmail.com"
];

firebase.auth().onAuthStateChanged(function(user) {

  if (!user) {
    window.location.replace("index.html");
    return;
  }

  const isAdmin = adminEmails.includes(user.email);
  const currentPage = window.location.pathname;

  if (currentPage.endsWith("dashboard-admin.html") && !isAdmin) {
    window.location.replace("dashboard-user.html");
    return;
  }

  if (currentPage.endsWith("dashboard-user.html") && isAdmin) {
    window.location.replace("dashboard-admin.html");
    return;
  }

});
