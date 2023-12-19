import { defineStore } from 'pinia';
import { getById } from '../services/productService';

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: JSON.parse(localStorage.getItem('cart')) || [],
  }),
  getters: {

    getAllProducts: (state) => {
      return state.products.length;
    },
    getTotalPrice: (state) => {
      return state.products.reduce((acc, currVal) => acc + ((((100 - currVal.product.discount) / 100) * currVal.product.price) * currVal.quantity), 0);
    },
  },
  actions: {
    async addToCart(productId) {
      const productInCart = this.products.find(prod => prod.product._id === productId);
      if (!productInCart) {
        const product = await getById(productId);
        this.products.push({ product: { ...product }, quantity: 1 });
      }
      else {
        productInCart.quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(this.products));
    },
    removeProduct(productId) {
      this.products = this.products.filter(prod => prod.product._id !== productId);
      localStorage.setItem('cart', JSON.stringify(this.products));
    },
    clearCart() {
      this.products = [];
      localStorage.removeItem('cart');
    },
  },
});
