<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import Modal from '../../components/Modal.vue';
import { getById, remove } from '../../services/productService';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { paths } from '../../utils/paths';
import dateFormatter from '../../utils/dateFormatter';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCartStore();
const authStore = useAuthStore();
const { user, isAuthenticated } = storeToRefs(authStore);

const product = ref({});
const deleteModalOpen = ref(false);

onMounted(async () => {
  product.value = await getById(route.params.productId);
});

watch(() => route.params.productId, async (newProductId) => {
  product.value = await getById(newProductId);
});

async function deleteHandler() {
  try {
    await remove(product.value._id);
    router.push(paths.store);
  }
  catch (err) {
    console.log(err.message);
  }

  deleteModalOpen.value = false;
}

async function addToBagHandler() {
  if (!isAuthenticated.value) {
    router.push(paths.login);
    return;
  }
  addToCart(product.value._id);
}
</script>

<template>
  <Modal v-if="deleteModalOpen" :delete-handler="deleteHandler" />
  <div class="bg-white">
    <div class="pt-4">
      <!-- Product info -->
      <div class="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24">
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {{ product.title }}
          </h1>
        </div>

        <!-- Options -->
        <div class="lg:row-span-3 lg:mt-0">
          <div class="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block">
            <img :src="product.imageUrl" :alt="product.title" class="h-full w-full object-cover object-center">
          </div>

          <h2 class="sr-only">
            Product information
          </h2>

          <p class="mt-2 text-3xl tracking-tight text-gray-900">
            <span v-if="product.discount" class="mr-2 text-xl text-red-600 bg-red-200 rounded px-2 py-1">-{{ product.discount }}%</span>
            <span v-if="product.discount" class="line-through mr-1 text-xl text-gray-900">${{ product.price }}</span>
            ${{ (((100 - product.discount) / 100) * product.price).toFixed(2) }}
          </p>

          <!-- Reviews -->
          <div class="mt-1">
            <h3 class="sr-only">
              Stock
            </h3>
            <div class="flex items-center">
              <p v-if="product.stock > 0" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {{ product.stock }} more left
              </p>
              <p v-else class="text-sm font-medium text-red-600 hover:text-red-500">
                Out of stock
              </p>
            </div>
          </div>

          <!-- Actions if the User is Owner of the record -->
          <template v-if="isAuthenticated && user._id === product.owner?._id">
            <router-link :to="`/store/${product._id}/edit`">
              <button class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Edit
              </button>
            </router-link>
            <button class="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="deleteModalOpen = true">
              Delete
            </button>
          </template>

          <!-- Actions if the User is not the owner of the record -->
          <template v-else>
            <button v-if="product.stock > 0" class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="addToBagHandler">
              Add to bag
            </button>
            <button v-else class="mt-6 flex cursor-default w-full items-center justify-center rounded-md border border-transparent bg-gray-500 px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Add to bag
            </button>
          </template>
        </div>

        <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          <!-- Description and details -->
          <div>
            <div class="mt-10">
              <h3 class="text-sm font-medium text-gray-900">
                Category
              </h3>

              <div class="mt-4 pl-2 space-y-6">
                <p class="text-gray-600 text-sm capitalize">
                  {{ product.category }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">
              Brand
            </h3>

            <div class="mt-4 pl-2 space-y-6">
              <p class="text-gray-600 text-sm">
                {{ product.brand }}
              </p>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">
              Description
            </h3>

            <div class="mt-4 pl-2 space-y-6">
              <p class="text-gray-600 text-sm">
                {{ product.description }}
              </p>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">
              Creation Info
            </h3>

            <div class="mt-4 pl-2 space-y-6">
              <p class="text-gray-600 text-sm">
                Created by <span class="font-medium">{{ product.owner?.email }}</span> on  <span class="font-medium">{{ dateFormatter(product.createdAt) }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
