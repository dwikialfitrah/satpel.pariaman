const firebaseConfig = {
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUdkRKithy90zkDMa14nfjQne5FxmkhZM",
  authDomain: "website-satpel-pariaman.firebaseapp.com",
  projectId: "website-satpel-pariaman",
  storageBucket: "website-satpel-pariaman.firebasestorage.app",
  messagingSenderId: "857253501191",
  appId: "1:857253501191:web:a169ce2bebf7267d124da2",
  measurementId: "G-61PL0G1C5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const adminEmail = "admin@email.com"; // GANTI EMAIL ADMIN

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
