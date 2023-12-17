import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import AddProduct from '../views/AddProduct/AddProduct.vue';
import { useAuthStore } from '../store/authStore';
import { paths } from '../utils/paths';

function validateIsAuth() {
  const authStore = useAuthStore();
  if (!authStore.getIsAuth()) {
    return { path: paths.login };
  }
}

function validateIsGuest() {
  const authStore = useAuthStore();
  if (authStore.getIsAuth()) {
    return { path: paths.home };
  }
}

const routes = [
  { path: '/', component: Home },
  { path: '/users/login', component: Login, beforeEnter: validateIsGuest },
  { path: '/users/register', component: Register, beforeEnter: validateIsGuest },
  { path: '/add-product', component: AddProduct, beforeEnter: validateIsAuth },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
