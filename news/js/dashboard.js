import { db, auth } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Protect page
onAuthStateChanged(auth, user => {
  if (!user) window.location.href = "../login.html";
});

// Publish article
window.publish = async function () {
  const title = document.getElementById("title").value.trim();
  const summary = document.getElementById("summary").value.trim();
  const content = document.getElementById("content").value.trim();
  const image = document.getElementById("image").value.trim();

  if (!title || !summary || !content) {
    alert("Please fill in all required fields.");
    return;
  }

  // Generate slug
  const slug = title.toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");

  try {
    await addDoc(collection(db, "articles"), {
      title,
      summary,
      content,
      image, // <-- just the GitHub URL or path
      slug,
      author: auth.currentUser.email,
      publishedAt: serverTimestamp()
    });

    alert("✅ Article published successfully!");

    // Reset form
    document.getElementById("title").value = "";
    document.getElementById("summary").value = "";
    document.getElementById("content").value = "";
    document.getElementById("image").value = "";

  } catch (error) {
    console.error("Error publishing article:", error);
    alert("❌ Failed to publish article.");
  }
};
