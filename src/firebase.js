import 'firebase/analytics';
import firebase from 'firebase/app';

if (process.env.NODE_ENV === 'production') {
  firebase.initializeApp({
    apiKey: 'AIzaSyAwIA0iUuTMsyEOumkpDODkhXtpaMwDq_U',
    appId: '1:996090838746:web:502ca5d05189215f',
    authDomain: 'izorg-munchkin.firebaseapp.com',
    databaseURL: 'https://izorg-munchkin.firebaseio.com',
    measurementId: 'G-PXJHCTHZLJ',
    messagingSenderId: '996090838746',
    projectId: 'izorg-munchkin',
    storageBucket: 'izorg-munchkin.appspot.com',
  });
  firebase.analytics();
}
