import {initializeApp} from 'firebase/app';
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
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

const provider= new GoogleAuthProvider();
provider.getCustomParameters({
    prompt:"select-account"
});

export const auth = getAuth();
export const signInWithGooglePopup= ()=> signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth= async(userAuth)=>{
    const userDocRef=doc(db,'users',userAuth.id);

    //console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user',error.message);
        }
    
    }

    return userDocRef;
};

