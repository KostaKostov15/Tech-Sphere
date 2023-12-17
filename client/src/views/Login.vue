<script setup>
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { email, helpers, minLength, required } from '@vuelidate/validators';

import { useAuthStore } from '../store/authStore';

import logo from '../assets/logo.png';
import { paths } from '../utils/paths';

const { loginUser } = useAuthStore();
const router = useRouter();

const isLoading = ref(false);

const userData = reactive({
  email: '',
  password: '',
});

const rules = computed(() => ({
  email: { required: helpers.withMessage('Email is required', required), email: helpers.withMessage('Please enter a valid email address', email) },
  password: { required: helpers.withMessage('Password is required', required), minLength: helpers.withMessage(
    ({
      $params,
    }) => `Password must be at least ${$params.min} characters`,
    minLength(6),
  ) },
}));
const v$ = useVuelidate(rules, userData);

async function submitHandler() {
  isLoading.value = true;

  const isValid = await v$.value.$validate();

  if (isValid) {
    await loginUser(userData.email, userData.password);
    router.push(paths.home);
  }

  isLoading.value = false;
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-16 w-auto" :src="logo" alt="site-logo">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        class="space-y-6"
        :disabled="isLoading"
        autocomplete="off"
        novalidate
        @submit.prevent="submitHandler"
      >
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
          <ul v-if="v$.email.$errors.length">
            <li v-for="error in v$.email.$errors" :key="error.$uid" class="mt-1 text-sm leading-6 text-red-600">
              {{ error.$message }}
            </li>
          </ul>
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
          <ul v-if="v$.password.$errors.length">
            <li v-for="error in v$.password.$errors" :key="error.$uid" class="mt-1 text-sm leading-6 text-red-600">
              {{ error.$message }}
            </li>
          </ul>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        New to Tech Sphere?
        {{ ' ' }}
        <router-link to="/users/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Create an account
        </router-link>
      </p>
    </div>
  </div>
</template>
