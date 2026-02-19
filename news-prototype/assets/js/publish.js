import { db } from "./firebase-config.js";
import { collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.publish = async function() {

  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const content = document.getElementById("content").value;

  const slug = title.toLowerCase().replace(/ /g,'-');

  await addDoc(collection(db,"articles"),{
    title,
    category,
    content,
    slug,
    created: new Date()
  });

  alert("Article Published");
}
