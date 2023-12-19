<script setup>
import { storeToRefs } from 'pinia';
import { CheckBadgeIcon } from '@heroicons/vue/24/outline';
import { useAuthStore } from '../../store/authStore';

const props = defineProps({ product: Object });
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
  <div class="group relative">
    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
      <img :src="props.product.imageUrl" :alt="props.product.title" class="h-full w-full object-cover object-center lg:h-full lg:w-full">
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <router-link :to="`/store/${props.product?._id}/details`">
            <span aria-hidden="true" class="absolute inset-0"><CheckBadgeIcon v-if="props.product?.owner === user?._id" class="text-sky-600 h-6 w-6" /></span>
            {{ props.product.title }}
          </router-link>
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ props.product.brand }}
        </p>
      </div>
      <p class="text-sm font-medium text-gray-900">
        <span v-if="props.product.discount" class="mr-2 text-sm font-bold text-red-600 bg-red-200 rounded p-1">-{{ props.product.discount }}%</span>
        <span v-if="props.product.discount" class="line-through mr-1 text-sm font-medium text-gray-900">${{ props.product.price }}</span>
        ${{ (((100 - props.product.discount) / 100) * props.product.price).toFixed(2) }}
      </p>
    </div>
  </div>
</template>
