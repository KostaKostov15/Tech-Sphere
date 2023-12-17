<script setup>
import { onMounted, ref } from 'vue';
import { getAll } from '../../services/productService';
import ProductItem from './ProductItem.vue';

const products = ref([]);

onMounted(async () => {
  const fetchedProducts = await getAll();
  products.value = fetchedProducts;
});
</script>

<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <template v-for="product in products" :key="product.id">
          <ProductItem :product="product" />
        </template>
      </div>
    </div>
  </div>
</template>
