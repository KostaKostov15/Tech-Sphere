import { defineStore } from 'pinia';
import { login, register } from '../services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('auth')),
    isAuthenticated: !!JSON.parse(localStorage.getItem('auth')),
  }),
  actions: {
    async registerUser(email, username, password) {
      const user = await register(email, username, password);

      // update pinia state
      this.user = user;

      this.isAuthenticated = true;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('auth', JSON.stringify(user));
    },
    async loginUser(email, password) {
      const user = await login(email, password);

      this.user = user;

      this.isAuthenticated = true;

      localStorage.setItem('auth', JSON.stringify(user));
    },
    async logoutUser() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('auth');
    },
  },
});
