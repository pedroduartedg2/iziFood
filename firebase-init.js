import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7bH5gWsVhrB0QGPOU5mLYsprwEL6UGhk",
  authDomain: "izifood-37261.firebaseapp.com",
  projectId: "izifood-37261",
  storageBucket: "izifood-37261.appspot.com",
  messagingSenderId: "927489460824",
  appId: "1:927489460824:web:284924c876f37d65ddd82d",
};
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const col = collection(db);
// export const addDocument = addDoc(db);

export const signInWitchGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);

      window.location.href = "/pages/Home/home.html";
    })
    .catch((error) => {
      console.log("erro: ", error);
    });
};

export const verifyLogin = () => {
  getAuth().onAuthStateChanged((user) => {
    // console.log("user: ", user);
    if (!user) {
      window.location.href = "/index.html";
    }
  });
};

export const logout = () => {
  signOut(getAuth())
    .then(() => {
      // Sign-out successful.
      localStorage.clear();
    })
    .catch((error) => {
      // An error happened.
    });
};
