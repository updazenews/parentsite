import { auth, db } from "./firebase-config.js";
import { doc, getDoc } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

auth.onAuthStateChanged(async user => {
  if(!user) {
    window.location.href = "/admin";
  } else {
    const snap = await getDoc(doc(db, "users", user.uid));
    const role = snap.data().role;

    if(!["admin","superadmin","editor"].includes(role)){
      alert("Access Denied");
      window.location.href = "/";
    }
  }
});
