import { db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const slug = new URLSearchParams(window.location.search).get("slug");

if (!slug) {
  document.body.innerHTML = "<h2>Article not found</h2>";
  throw new Error("Missing slug");
}

const q = query(
  collection(db, "articles"),
  where("slug", "==", slug)
);

const snap = await getDocs(q);

if (snap.empty) {
  document.body.innerHTML = "<h2>Article not found</h2>";
}

snap.forEach(doc => {
  const a = doc.data();

  // Content
  document.getElementById("title").innerText = a.title;
  document.getElementById("image").src = a.image || "";
  document.getElementById("content").innerHTML =
    a.content.split("\n").map(p => `<p>${p}</p>`).join("");

  // SEO
  document.title = `${a.title} | Sebenza News`;
  document.querySelector("meta[name=description]").content = a.summary;
  document.getElementById("ogTitle").content = a.title;
  document.getElementById("ogImage").content = a.image || "";
});
