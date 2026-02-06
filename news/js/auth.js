import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Email and password required");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "admin/add-article.html";
  } catch (error) {
    console.error(error);
    alert("Login failed");
  }
};
