<script setup>
const props = defineProps({ product: Object });
</script>

<template>
  <div class="group relative">
    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
      <img :src="props.product.imageUrl" :alt="props.product.title" class="h-full w-full object-cover object-center lg:h-full lg:w-full">
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <router-link :to="`/store/${props.product._id}/details`">
            <span aria-hidden="true" class="absolute inset-0" />
            {{ props.product.title }}
          </router-link>
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ props.product.brand }}
        </p>
      </div>
      <p class="text-sm font-medium text-gray-900">
        $ {{ props.product.price }}
      </p>
    </div>
  </div>
</template>
