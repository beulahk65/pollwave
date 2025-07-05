import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfu4WRrsU7NXzEGmi6znr9EsU2l7jQWzw",
  authDomain: "pollwave-7dd5a.firebaseapp.com",
  projectId: "pollwave-7dd5a",
  storageBucket: "pollwave-7dd5a.firebasestorage.app",
  messagingSenderId: "398077509222",
  appId: "1:398077509222:web:3fc9e828d3139540bff7a7",
  measurementId: "G-88J5JZGLFZ"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

