// Initialize Firebase
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmCHg9NCpGoLrnvGi0FU3D-GLwsFprTLc",
    authDomain: "pg-pg-3c086.firebaseapp.com",
    databaseURL: "https://pg-pg-3c086.firebaseio.com",
    projectId: "pg-pg-3c086",
    storageBucket: "pg-pg-3c086.appspot.com",
    messagingSenderId: "386125097306",
    appId: "1:386125097306:web:961690df29cf892a232b63",
    measurementId: "G-V2YBCGGXLL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);


// NE PAS OUBLIER DE CONFIGURER FIREBASE AUTH TO ANONYMOUS !!!

// SIGN ANONYMOUS USER ----
firebase.auth().onAuthStateChanged((user) => {
    console.log("onAuthStateChanged");
    if (user) {
        console.log(user);
        // User is signed in.
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        // console.log(uid);
    } else {
        // No user is signed in.
    }
});

firebase
    .auth()
    .signInAnonymously()
    .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("anonymously auth error ----- " + errorCode);
        console.log(errorCode);
    });


// function SEND_MESSAGE(_type, _data = "yes") {
//     // _data = {'data': _data, 't_created': Date.now()};
//     database.ref(_type).set(_data);
// }

// function writeUserData(userId, name, email, imageUrl) {
//     firebase.database().ref('users/' + userId).set({
//         username: name,
//         email: email,
//         profile_picture: imageUrl

//     });
//     console.log("send");
// }