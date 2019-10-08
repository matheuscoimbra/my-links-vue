import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDXrf4dCSVwlwRNyElZFYl7TS10ntmg7_8",
  authDomain: "pushnotification-43424.firebaseapp.com",
  databaseURL: "https://pushnotification-43424.firebaseio.com",
  projectId: "pushnotification-43424",
  storageBucket: "pushnotification-43424.appspot.com",
  messagingSenderId: "635154511441",
  appId: "1:635154511441:web:7c8dde0cfa412d2af96a70",
  measurementId: "G-2JYXP6EJRJ"
}

let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}

export const db = app

