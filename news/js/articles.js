import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  // your code here
  const container = document.getElementById("innerCarousal");
  const indicators = document.getElementById("indicators");

const q = query(
  collection(db, "articles"),
  orderBy("publishedAt", "desc")
);

const snapshot = await getDocs(q);

snapshot.forEach(doc => {
  const a = doc.data();

  container.innerHTML += `
    <div class="carousel-item active">
      <img src="${a.image}" class="d-block w-100" alt="Featured News">
      <div class="carousel-caption d-none d-md-block">
        <h5>${a.title}</h5>
        <p>${a.summary}</p>
      </div>
    </div>
  `;
  indicators.innerHTML += `
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${indicators.children.length}" class="active" aria-current="true" aria-label="Slide ${indicators.children.length + 1}"></button>
  `;
});

//document.getElementById("title").innerText = a.title;

// Load image from GitHub
if (a.image) {
  document.getElementById("image").src = a.image;
  document.getElementById("image").alt = a.title;
}
document.getElementById("content").innerHTML =
  a.content.split("\n").map(p => `<p>${p}</p>`).join("");



});

