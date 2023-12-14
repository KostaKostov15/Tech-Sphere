import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import AddProduct from '../views/AddProduct/AddProduct.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/users/login', component: Login },
  { path: '/users/register', component: Register },
  { path: '/add-product', component: AddProduct },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
