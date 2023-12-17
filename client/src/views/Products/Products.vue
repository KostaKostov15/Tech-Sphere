<script setup>
import { onMounted, ref } from 'vue';
import { getAll } from '../../services/productService';

// const products = [
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: 'Front of men\'s Basic Tee in black.',
//     price: '$35',
//     color: 'Black',
//   },
//   {
//     id: 2,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
//     imageAlt: 'Front of men\'s Basic Tee in black.',
//     price: '$35',
//     color: 'Black',
//   },
//   {
//     id: 3,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
//     imageAlt: 'Front of men\'s Basic Tee in black.',
//     price: '$35',
//     color: 'Black',
//   },
//   // More products...
// ];
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
        <div v-for="product in products" :key="product.id" class="group relative">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img :src="product.imageUrl" :alt="product.title" class="h-full w-full object-cover object-center lg:h-full lg:w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <router-link :to="`/store/${product._id}/details`">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ product.title }}
                </router-link>
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                {{ product.brand }}
              </p>
            </div>
            <p class="text-sm font-medium text-gray-900">
              $ {{ product.price }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
