
import Intro from '../components/Intro'
import Login from '../components/Login'
import Router from 'vue-router'


let router = new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Intro,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      redirect: '/login',
    }
  ]
});

router.beforeEach((to,from,next)=>{
    let currentUser=firebase.auth().currentUser;
    let requiresAuth=to.matched.some(record=>record.meta.requiresAuth);
  
    if(requiresAuth && !currentUser) next('login')
    else if (!requiresAuth && currentUser) next('home')
    else next()
  });


export default router