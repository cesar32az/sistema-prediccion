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
        path: '/add-paciente',
        name: 'AgregarPaciente',
        component: () =>
          import(/* webpackChunkName: "add-paciente" */ '../views/paciente/AgregarPaciente..vue'),
      },
      {
        path: '/pacientes',
        name: 'ListarPacientes',
        component: () =>
          import(/* webpackChunkName: "pacientes" */ '../views/paciente/ListarPacientes.vue'),
      },
      {
        path: '/add-consulta',
        name: 'AgregarConsulta',
        component: () =>
          import(/* webpackChunkName: "add-consulta" */ '../views/consultas/Agregar.vue'),
      },
      {
        path: '/registros',
        name: 'Registros',
        component: () =>
          import(/* webpackChunkName: "registros" */ '../views/consultas/Registros.vue'),
      },
      {
        path: '/graficas',
        name: 'Graficas',
        component: () =>
          import(/* webpackChunkName: "graficas" */ '../views/Graficas.vue'),
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
