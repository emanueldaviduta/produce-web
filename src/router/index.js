
import Home from '../views/Home'
import Login from '../views/Login'
import Router from 'vue-router'


let router = new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta:{
        requiresAuth: true
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
  
    if(requiresAuth && !currentUser) next({path:'/login', query: {redirect: to.fullPath}})
    else if (!requiresAuth && currentUser) next({path:'/login'})
    else next()
  });


export default router