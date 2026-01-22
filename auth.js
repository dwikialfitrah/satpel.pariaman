function login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      // redirect aman (tidak bisa back)
      window.location.replace("dashboard-user.html");
    })
    .catch(error => {
      document.getElementById("error").innerText =
        "Email atau password salah";
    });
}

function logout(){
  firebase.auth().signOut()
    .then(() => {
      // kembali ke dashboard utama
      window.location.replace("index.html");
    })
    .catch((error) => {
      alert("Logout gagal");
      console.error(error);
    });
}


