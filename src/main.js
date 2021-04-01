import {createApp } from 'vue'
import App from './App.vue'
import router from './router';

import firebase from 'firebase/app';

require('firebase/firestore');

firebase.initializeApp({
    apiKey: 'AIzaSyANy-x2cYEXyWnzbykXTiHxpS0SZqkuVfY',
    projectId: 'food-nutrition-44c75',
    databaseURL: 'https://food-nutrition-44c75.firebaseio.com',
    messagingSenderId: '827356207352'
});
export const db = firebase.firestore();
createApp(App).use(router).mount('#app');

// let app;
// firebase.auth().onAuthStateChanged((user) => {
//     if (!app) {
//         app = new Vue({
//             el: '#app',
//             router: router,
//             components: { App },
//             template: '<App/>'
//         })
//     }
// });


