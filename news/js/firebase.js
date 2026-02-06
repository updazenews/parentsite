import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDiRXSGIXw8lbbxx_jZk0VOyCzmt0rasLQ",
  authDomain: "updaze-news.firebaseapp.com",
  projectId: "updaze-news",
  storageBucket: "updaze-news.firebasestorage.app",
  messagingSenderId: "360342332196",
  appId: "1:360342332196:web:732d9972e8d7f69a1209b1",
  measurementId: "G-PHWVGJ3Q72"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
