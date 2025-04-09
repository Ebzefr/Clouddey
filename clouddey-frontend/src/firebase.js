import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCKFtn59PxLGCETtswF8bic3Tr5v0sUFXY",
    authDomain: "clouuddey.firebaseapp.com",
    projectId: "clouuddey",
    storageBucket: "clouuddey.firebasestorage.app",
    messagingSenderId: "910205579824",
    appId: "1:910205579824:web:cfea677535c42a31d833f5"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
export default app;