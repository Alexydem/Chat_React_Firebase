import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import {
    getDatabase,
    ref
} from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyB2-Rym-fXM0OHjuhj3V0F7Ih07KLK33Ug",
    authDomain: "chat-9e234.firebaseapp.com",
    projectId: "chat-9e234",
    storageBucket: "chat-9e234.appspot.com",
    messagingSenderId: "576099149879",
    appId: "1:576099149879:web:5fcf112412e8930a6337b2"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('UID нового пользователя:', user.uid);
    return userCredential;
}
export const signIn = async (email, password) => await signInWithEmailAndPassword(auth, email, password)
export const logOut = async () => await signOut(auth)

// export const firebaseUser = (user) => onAuthStateChanged(auth, user)

// export const user = auth.currentUser;

//data base
export const db = getDatabase(app)

export const userRef = ref(db, 'user')
export const chatsRef = ref(db, 'chats')

export const getChatById = (chatId) => ref(db, `chats/${chatId}`)
export const getMessagesById = (chatId) => ref(db, `chats/${chatId}/messages/`);
export const removeMessageFromChat = (chatId, messageId) => ref(db, `chats/${chatId}/messages/${messageId}`);


export const getUserById = (userId) => ref(db, `user/${userId}`)

