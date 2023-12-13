import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

// import Cart from '../components/Cart.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/users/login', component: Login },
  { path: '/users/register', component: Register },
  // { path: '/cart', component: Cart },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
