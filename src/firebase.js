// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Đọc API KEY từ Vite (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "computational-thinking-lab.firebaseapp.com",
  projectId: "computational-thinking-lab",
  storageBucket: "computational-thinking-lab.firebasestorage.app",
  messagingSenderId: "699976285990",
  appId: "1:699976285990:web:0878f18a949427f85c8be7",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Export Auth
export const auth = getAuth(app);
