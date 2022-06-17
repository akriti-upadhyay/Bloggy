import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDARYJ9aSTNOcpUvVCNyLsfLosVnNEqgiY',
    authDomain: 'bloggy-c648a.firebaseapp.com',
    projectId: 'bloggy-c648a',
    storageBucket: 'bloggy-c648a.appspot.com',
    messagingSenderId: '370616644497',
    appId: '1:370616644497:web:f4b11080a1f5cf372b6030',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { db, auth, provider }
