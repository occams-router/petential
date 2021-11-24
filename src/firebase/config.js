import { initializeApp } from 'firebase/app';
import secrets from '../../secrets';
import '@firebase/auth';
import '@firebase/firestore';
import { getAuth} from "firebase/auth"

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
	apiKey: secrets.API_KEY,
	authDomain: secrets.AUTH_DOMAIN,
	projectId: secrets.PROJECT_ID,
	storageBucket: secrets.STORAGE_BUCKET,
	messagingSenderId: secrets.MESSAGING_SENDER_ID,
	appId: secrets.APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)