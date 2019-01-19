import firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyAwIA0iUuTMsyEOumkpDODkhXtpaMwDq_U',
  projectId: 'izorg-munchkin',
};

if (process.env.NODE_ENV === 'production') {
  firebase.initializeApp(config);
}
