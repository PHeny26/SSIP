// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js"
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvc_PaIPZUeNzgr5crDnJxtNUD6UGejik",
  authDomain: "ssip-c382d.firebaseapp.com",
  projectId: "ssip-c382d",
  storageBucket: "ssip-c382d.firebasestorage.app",
  messagingSenderId: "902242180503",
  appId: "1:902242180503:web:b3b3cffa41055edcf8f8d2",
  measurementId: "G-R8YNZ1EYPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divID){
    var messageDiv=document.getElementById(divID);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}
const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email=document.getElementById('Email').value;
    const password=document.getElementById('Password').value;
    const name=document.getElementById('Name').value;

    const auth=getAuth();
    const db=getFirestore();


    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials)=>{
        const user=userCredentials.user;
        const userData={
            email: email,
            name: name
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!','signUpMessage');
        }
        else{
            showMessage('unable to create user','signUpMessage');
        }
    })
});