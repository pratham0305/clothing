import {initializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBA6xaxmJUA5nk5eVfU5djJWpTfkG-sXXg",
  authDomain: "crwn-clothing-db-fae76.firebaseapp.com",
  projectId: "crwn-clothing-db-fae76",
  storageBucket: "crwn-clothing-db-fae76.appspot.com",
  messagingSenderId: "866861131815",
  appId: "1:866861131815:web:5e655d0c574f1fe4fe0602",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleprovider= new GoogleAuthProvider();
googleprovider.setCustomParameters({
    prompt:'select_ account',
});

export const auth = getAuth();
export const signInWithGooglePopup= ()=> signInWithPopup(auth,googleprovider);
export const signInWithGoogleRedirect =()=> signInWithRedirect(auth,googleprovider);

export const db = getFirestore();

export const createUserDocumentFromAuth= async(userAuth,additionalInformation={})=>{

    const userDocRef=doc(db,'users',userAuth.uid);

    //console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user',error.message);
        }
    
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email,password)=>{
    if(!email || !password){
        return;
    }

    return await createAuthUserWithEmailAndPassword(auth,email,password);
}