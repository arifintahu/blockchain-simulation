import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Page.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Page.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: () => import('../views/transaction/Page.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/mining',
    name: 'Mining',
    component: () => import('../views/mining/Page.vue'),
    meta: {
      requiresAuth: true
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.username) {
      if(!store.getters.user) {
        store.dispatch('getUser', user);
      }
      next();
    } else {
      next({ name: 'Login' });
    }
  } else {
    next();
  } 
})

export default router;
