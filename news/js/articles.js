import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const container = document.getElementById("newsContainer");

const q = query(
  collection(db, "articles"),
  orderBy("publishedAt", "desc")
);

const snapshot = await getDocs(q);

snapshot.forEach(doc => {
  const a = doc.data();

  container.innerHTML += `
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        ${a.image ? `<img src="${a.image}" class="card-img-top">` : ""}
        <div class="card-body">
          <h5 class="card-title">${a.title}</h5>
          <p class="card-text">${a.summary}</p>
          <a href="article.html?slug=${a.slug}" class="btn btn-danger btn-sm">
            Read More
          </a>
        </div>
      </div>
    </div>
  `;
});
