import { db, storage, auth } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* 🔐 Protect page: only logged-in writers */
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "../login.html";
  }
});

/* 📰 Publish article */
window.publish = async function () {
  const title = document.getElementById("title").value.trim();
  const summary = document.getElementById("summary").value.trim();
  const content = document.getElementById("content").value.trim();
  const imageFile = document.getElementById("image").files[0];

  if (!title || !summary || !content) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    let imageUrl = "";

    /* 📷 Upload image if provided */
    if (imageFile) {
      const imageRef = ref(
        storage,
        `articles/${Date.now()}-${imageFile.name}`
      );

      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    /* 🔗 Generate URL-friendly slug */
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    /* 💾 Save article to Firestore */
    await addDoc(collection(db, "articles"), {
      title,
      summary,
      content,
      image: imageUrl,
      slug,
      author: auth.currentUser.email,
      publishedAt: serverTimestamp()
    });

    alert("✅ Article published successfully!");

    /* 🔄 Reset form */
    document.getElementById("title").value = "";
    document.getElementById("summary").value = "";
    document.getElementById("content").value = "";
    document.getElementById("image").value = "";

  } catch (error) {
    console.error("Error publishing article:", error);
    alert("❌ Failed to publish article. Check console.");
  }
};
