import { db } from "./firebase.js";
import { collection, query, where, getDocs } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const slug = new URLSearchParams(window.location.search).get("slug");

const q = query(collection(db, "articles"), where("slug", "==", slug));
const snap = await getDocs(q);

snap.forEach(doc => {
  const a = doc.data();

  document.getElementById("title").innerText = a.title;
  document.getElementById("image").src = a.image;
  document.getElementById("content").innerHTML = a.content;

  // SEO META
  document.title = a.title + " | Sebenza News";
  document.querySelector("meta[name=description]").content = a.summary;
  document.getElementById("ogTitle").content = a.title;
  document.getElementById("ogImage").content = a.image;
});
