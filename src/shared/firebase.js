import firebase from "firebase/app";
import "firebase/auth";

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


// 다른 파일에서 firebase 가져와서 쓰는거 만들어주기
const auth = firebase.auth();

export {auth};

// firebase 설정 완료!