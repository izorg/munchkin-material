import firebase from 'firebase/app';

import 'firebase/analytics';

if (process.env.NODE_ENV === 'production') {
  const firebaseConfig = {
    apiKey: 'AIzaSyAwIA0iUuTMsyEOumkpDODkhXtpaMwDq_U',
    authDomain: 'izorg-munchkin.firebaseapp.com',
    databaseURL: 'https://izorg-munchkin.firebaseio.com',
    projectId: 'izorg-munchkin',
    storageBucket: 'izorg-munchkin.appspot.com',
    messagingSenderId: '996090838746',
    appId: '1:996090838746:web:502ca5d05189215f',
    measurementId: 'G-PXJHCTHZLJ',
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}
