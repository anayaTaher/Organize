import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyDlzRcyZJd5VSBrWJJr31qQs2B4-Rp3JFY",
	authDomain: "organize-4127e.firebaseapp.com",
	projectId: "organize-4127e",
	storageBucket: "organize-4127e.appspot.com",
	messagingSenderId: "109890046422",
	appId: "1:109890046422:web:86991eece96684684dfc77",
	measurementId: "G-63PMDZ6GHN"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()

export {db, auth}

