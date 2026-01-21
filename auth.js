// CONFIG FIREBASE (PASTE DARI CONSOLE)
const firebaseConfig = {
  apiKey: "AIzaSyAUdkRKithy90zkDMa14nfjQne5FxmkhZM",
  authDomain: "website-satpel-pariaman.firebaseapp.com",
  projectId: "website-satpel-pariaman",
};

// INIT
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// EMAIL ADMIN
const adminEmail = "dwiki.alfitrah070101@gmail.com";

function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      const user = userCredential.user;

      if (user.email === adminEmail) {
        window.location.href = "dashboard-admin.html";
      } else {
        window.location.href = "dashboard-user.html";
      }
    })
    .catch(err => {
      document.getElementById("error").innerText = err.message;
    });
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}
