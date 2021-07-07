import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// storage 서비스를 사용할 수 있게 해주기!!
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyC16um_9dF5n-g1Pe8oP7_lH1sFUluL184",
    authDomain: "image-community-58873.firebaseapp.com",
    projectId: "image-community-58873",
    storageBucket: "image-community-58873.appspot.com",
    messagingSenderId: "798377825656",
    appId: "1:798377825656:web:afe6c34e45de7c56bd248d",
    measurementId: "G-RXBWMT2SKT"
};


firebase.initializeApp(firebaseConfig);


const apiKey = firebaseConfig.apiKey;

// 다른 파일에서 firebase 가져와서 쓰는거 만들어주기
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();


export {auth, apiKey, firestore, storage};

// firebase 설정 완료!