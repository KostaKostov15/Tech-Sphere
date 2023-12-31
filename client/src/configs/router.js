import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import { paths } from '../utils/paths';

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import AddProduct from '../views/AddProduct/AddProduct.vue';
import EditProduct from '../views/EditProduct/EditProduct.vue';
import Products from '../views/Products/Products.vue';
import ProductDetails from '../views/ProductDetails/ProductDetails.vue';
import NotFound from '../views/NotFound.vue';

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
  { path: '/users/profile', component: Profile, beforeEnter: validateIsAuth },
  { path: '/add-product', component: AddProduct, beforeEnter: validateIsAuth },
  { path: '/store', component: Products },
  { path: '/store/:productId/details', component: ProductDetails },
  { path: '/store/:productId/edit', component: EditProduct },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
