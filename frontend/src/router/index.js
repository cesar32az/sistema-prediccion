import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/home',
        name: 'Home',
        alias: '/',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      },
      {
        path: '/gastos',
        name: 'Gastos',
        component: () => import(/* webpackChunkName: "gastos" */ '../views/Gastos.vue'),
      },
      {
        path: '/calendario',
        name: 'Calendario',
        component: () => import(/* webpackChunkName: "calendario" */ '../views/Calendario.vue'),
      },
      {
        path: '/presupuesto',
        name: 'Presupuesto',
        component: () => import(/* webpackChunkName: "presupuesto" */ '../views/Presupuesto.vue'),
      },
    ],
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register"*/ '../views/auth/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
