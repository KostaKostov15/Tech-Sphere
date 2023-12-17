<script setup>

</script>

<template>
  <div v-for="product in products" :key="product.id" class="group relative">
    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
      <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-cover object-center lg:h-full lg:w-full">
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <a :href="product.href">
            <span aria-hidden="true" class="absolute inset-0" />
            {{ product.name }}
          </a>
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ product.color }}
        </p>
      </div>
      <p class="text-sm font-medium text-gray-900">
        {{ product.price }}
      </p>
    </div>
  </div>
</template>
