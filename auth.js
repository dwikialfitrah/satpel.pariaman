function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.replace("dashboard-user.html");
    })
    .catch(() => {
      document.getElementById("error").innerText =
        "Email atau password salah";
    });
}

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.replace("index.html");
  });
}
