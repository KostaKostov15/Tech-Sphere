import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/users/login', component: Login },
  { path: '/users/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
