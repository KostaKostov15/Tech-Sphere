<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../store/authStore';
import { getById } from '../services/authService';
import dateFormatter from '../utils/dateFormatter';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const userData = ref({});

onMounted(async () => {
  userData.value = await getById(user.value?._id);
});
</script>

<template>
  <div class="p-12">
    <div class="px-4 sm:px-0">
      <h3 class="text-base font-semibold leading-7 text-gray-900">
        Profile Information
      </h3>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        Personal details
      </p>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Username
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ userData.username }}
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Email address
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ userData.email }}
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            User since
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ dateFormatter(userData.createdAt) }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
