
import Home from '../views/Home';
import Login from '../views/Login';
import { createRouter, createWebHistory } from 'vue-router';
import firebase from "firebase/app";
import "firebase/auth";

const routes = [
  {
    path: '/',
    redirect: 'login',
    component: Login
  }, {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to,from,next)=>{
  console.log(firebase.auth());
    let currentUser=firebase.auth().currentUser;
    let requiresAuth=to.matched.some(record=>record.meta.requiresAuth);

    if(requiresAuth && !currentUser) next('login')
    else if (!requiresAuth && currentUser) next('home')
    else next()
  });

export default router
// let router = new Router({
//   routes: [
//     {
//       path: '/home',
//       name: 'Home',
//       component: Home,
//       meta:{
//         requiresAuth: true
//       }
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: Login
//     },
//     {
//       path: '*',
//       redirect: '/login',
//     }
//   ]
// });



