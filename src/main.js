import {createApp } from 'vue'
import App from './App.vue'
import router from './router';
import PrimeVue from 'primevue/config';

import firebase from 'firebase/app';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import 'primevue/resources/themes/saga-blue/theme.css' 
import 'primevue/resources/primevue.min.css'     
import 'primeicons/primeicons.css'         

require('firebase/firestore');

firebase.initializeApp({
    apiKey: 'AIzaSyANy-x2cYEXyWnzbykXTiHxpS0SZqkuVfY',
    projectId: 'food-nutrition-44c75',
    databaseURL: 'https://food-nutrition-44c75.firebaseio.com',
    messagingSenderId: '827356207352'
});
export const db = firebase.firestore();
createApp(App).use(router).use(PrimeVue).component('DataTable', DataTable).component('Column',Column).component('Button', Button).mount('#app');


