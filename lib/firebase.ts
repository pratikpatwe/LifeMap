import { initializeApp, getApps, getApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FBDB_API_KEY,
  authDomain: "lifemap-e3357.firebaseapp.com",
  projectId: "lifemap-e3357",
  storageBucket: "lifemap-e3357.firebasestorage.app",
  messagingSenderId: "509272291606",
  appId: "1:509272291606:web:8c1097c848f8c4b0df7837",
  measurementId: "G-721FLM3W2E",
  databaseURL: "https://lifemap-e3357-default-rtdb.firebaseio.com",
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth(app)

export { app, db, auth }

