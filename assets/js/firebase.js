// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBMRnB2Ci0ZRVpjkqcww1ncKWSrAHRFIk",
  authDomain: "pizzaria-santello.firebaseapp.com",
  projectId: "pizzaria-santello",
  storageBucket: "pizzaria-santello.appspot.com",
  messagingSenderId: "965805311044",
  appId: "1:965805311044:web:9ebdc09edaac1d2162a811"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getStorage, ref, uploadBytes, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js"

const uploadImage =  async (image, name) => {
    const storage = getStorage(app);

    const mountainsRef = ref(storage, `pizza/${name}.jpg`);
    
    await uploadBytes(mountainsRef, image)

    return await getDownloadURL(mountainsRef)
   
}

export {
  uploadImage
}
