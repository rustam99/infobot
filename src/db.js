import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase
	.initializeApp({
		projectId: 'vue-infobot',
		apiKey: 'AIzaSyCslPF540cI4Hp6F30WyOSJwwwZa3rgulY',
		authDomain: 'vue-infobot.firebaseapp.com',
		databaseURL: 'https://vue-infobot.firebaseio.com',
		storageBucket: 'vue-infobot.appspot.com',
		messagingSenderId: '340153411625',
		appId: '1:340153411625:web:4c8b5db28154b4d9995438',
	})
	.firestore();

export default db;
