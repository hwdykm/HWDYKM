import firebase from '@/api/firebase.js'
firebase
    .collection('hwdykm')
    .doc('roomName')
    .then((data) => {
        console.log(data)
    })