
import Home from '../views/Home';
import Login from '../views/Login';
import { createRouter, createWebHistory } from 'vue-router';
import firebase from "firebase/app";
import "firebase/auth";

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: Home
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
    let currentUser=firebase.auth().currentUser;
    let requiresAuth=to.matched.some(record=>record.meta.requiresAuth);

    if(requiresAuth && !currentUser) next('login')
    else if (!requiresAuth && currentUser) next('home')
    else next()
  });

export default router



