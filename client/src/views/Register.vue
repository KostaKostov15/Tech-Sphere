<script setup>
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { email, minLength, minValue, required } from '@vuelidate/validators';

import { useAuthStore } from '../store/authStore';

import logo from '../assets/logo.png';

const { registerUser } = useAuthStore();
const router = useRouter();

const isLoading = ref(false);

const userData = reactive({
  email: '',
  username: '',
  password: '',
  rePassword: '',
});

const rules = computed(() => ({
  email: { required, email },
  username: { required, minLength: minLength(5) },
  password: { required, minValue: minValue(6) },
  rePassword: { required, minValue: minValue(6) },
}));
const v$ = useVuelidate(rules, userData);

async function submitHandler() {
  isLoading.value = true;

  const isValid = await v$.value.$validate();
  if (isValid) {
    await registerUser(userData.email, userData.username, userData.password);
    router.push('/');
  }

  isLoading.value = false;
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-16 w-auto" :src="logo" alt="site-logo">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign up now
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" :disabled="isLoading" @submit.prevent="submitHandler">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input
              id="email"
              v-model="v$.email.$model"
              name="email"
              type="email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
          </div>
        </div>

        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div class="mt-2">
            <input
              id="username"
              v-model="v$.username.$model"
              name="username"
              type="text"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input
              id="password"
              v-model="v$.password.$model"
              name="password"
              type="password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="rePassword" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
          </div>
          <div class="mt-2">
            <input
              id="rePassword"
              v-model="v$.rePassword.$model"
              name="rePassword"
              type="password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign up
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        {{ ' ' }}
        <router-link to="/users/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign In
        </router-link>
      </p>
    </div>
  </div>
</template>
