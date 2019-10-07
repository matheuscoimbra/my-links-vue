import firebase from 'firebase'

const firebaseConfig = {

}

let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}

export const db = app

