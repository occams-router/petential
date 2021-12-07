import { initializeApp } from 'firebase/app';
import secrets from '../../secrets';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: secrets.API_KEY,
  authDomain: secrets.AUTH_DOMAIN,
  projectId: secrets.PROJECT_ID,
  storageBucket: secrets.STORAGE_BUCKET,
  messagingSenderId: secrets.MESSAGING_SENDER_ID,
  appId: secrets.APP_ID,
};

const app = initializeApp(firebaseConfig);

<<<<<<< HEAD
export const storage = getStorage();
export const bucket = firebaseConfig.storageBucket;

=======
>>>>>>> 648193b6278d6060966172735c7965eed3a46a15
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
