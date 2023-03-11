import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


function initFirebase() {
    if (firebase.app.length) {
        firebase.initializeApp({
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
    }
}

initFirebase();


export default firebase;