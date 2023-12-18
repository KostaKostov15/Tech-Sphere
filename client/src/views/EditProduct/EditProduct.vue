<script setup>
import useVuelidate from '@vuelidate/core';
import { helpers, maxLength, maxValue, minLength, minValue, required, url } from '@vuelidate/validators';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { update } from '../../services/productService';

const router = useRouter();
const route = useRoute();
const isLoading = ref(false);

const productData = reactive({
  category: '',
  brand: '',
  title: '',
  imageUrl: '',
  price: 0,
  stock: 0,
  discount: 0,
  description: '',
});

const rules = computed(() => ({
  category: { required: helpers.withMessage('Category is required', required) },
  brand: { required: helpers.withMessage('Brand is required', required) },
  title: { required: helpers.withMessage('Title is required', required) },
  imageUrl: { required: helpers.withMessage('Image is required', required), url: helpers.withMessage('Plase enter a valid URL address', url) },
  price: { required: helpers.withMessage('Price is required', required), minValue: helpers.withMessage(() => 'Price must be a positive number', minValue(1)) },
  stock: { required: helpers.withMessage('Stock is required', required), minValue: helpers.withMessage(() => 'Stock must be a positive number', minValue(1)) },
  discount: { required: helpers.withMessage('Discount is required', required), minValue: helpers.withMessage(() => 'Discount must be a non negative number', minValue(0)), maxValue: helpers.withMessage(() => 'Discount must be less than 100', maxValue(100)) },
  description: { required: helpers.withMessage('Description is required', required), minLength: helpers.withMessage(() => 'Description must be at least 10 characters', minLength(10)), maxLength: helpers.withMessage(() => 'Description must not exceed 900 characters', maxLength(900)) },
}));

const v$ = useVuelidate(rules, productData);

async function submitHandler() {
  isLoading.value = true;

  v$.value.$touch();
  if (v$.value.$invalid) {
    // eslint-disable-next-line no-alert
    alert('Invalid Form');
    return false;
  }
  else {
    await update(route.params.productId, productData);
    router.push(`/store/${route.params.productId}/details`);
  }

  isLoading.value = false;
}
</script>

<template>
  <form
    class="p-14 bg-white m-auto"
    novalidate
    autocomplete="off"
    :disabled="isLoading"
    @submit.prevent="submitHandler"
  >
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Product Information
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          Write a detailed information about the product you are creating.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-6">
            <label for="category" class="block text-sm font-medium leading-6 text-gray-900">Category</label>
            <div class="mt-2">
              <select
                id="category"
                v-model="v$.category.$model"
                name="category"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="">
                  -- Select --
                </option>
                <option value="smartphones">
                  Smartphones
                </option>
                <option value="laptops">
                  Laptops
                </option>
              </select>
            </div>
            <ul v-if="v$.category.$errors.length">
              <li v-for="error in v$.category.$errors" :key="error.$uid" class="mt-1 text-sm leading-6 text-red-600">
                {{ error.$message }}
              </li>
            </ul>
          </div>

          <div class="sm:col-span-3">
            <label for="brand" class="block text-sm font-medium leading-6 text-gray-900">Brand</label>
            <div class="mt-2">
              <input
                id="brand"
                v-model="v$.brand.$model"
                type="text"
                name="brand"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
            <ul v-if="v$.brand.$errors.length">
              <li v-for="error in v$.brand.$errors" :key="error.$uid" class="mt-1 text-sm leading-6 text-red-600">
                {{ error.$message }}
              </li>
            </ul>
          </div>

          <div class="sm:col-span-3">
            <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
            <div class="mt-2">
              <input
                id="title"
                v-model="v$.title.$model"
                type="text"
                name="title"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
            <ul v-if="v$.title.$errors.length">
              <li v-for="error in v$.title.$errors" :key="error.$uid" class="mt-1 text-sm leading-6 text-red-600">
                {{ error.$message }}
              </li>
            </ul>
          </div>

          <div class="col-span-full">
            <label for="imageUrl" class="block text-sm font-medium leading-6 text-gray-900">Image URL</label>
            <div class="mt-2">
              <input
                id="imageUrl"
                v-model="v$.imageUrl.$model"
                type="text"
                name="imageUrl"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
            <ul v-if="v$.imageUrl.$errors.length">
              <li v-for="error in v$.imageUrl.$errors" :key="error.$uid" class="mt-1 text-sm leading-6 text-red-600">
                {{ error.$message }}
              </li>
            </ul>
          </div>

          <div class="sm:col-span-2 sm:col-start-1">
            <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
            <div class="mt-2">
              <input
                id="price"
                v-model="v$.price.$model"
                type="number"
                name="price"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
            <ul v-if="v$.price.$errors.length">
              <li v-for="error in v$.price.$errors" :key="error.$uid" class="mt-1 text-sm leading-6 text-red-600">
                {{ error.$message }}
              </li>
            </ul>
          </div>

          <div class="sm:col-span-2">
            <label for="stock" class="block text-sm font-medium leading-6 text-gray-900">Stock</label>
            <div class="mt-2">
              <input
                id="stock"
                v-model="v$.stock.$model"
                type="number"
                name="stock"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
            <ul v-if="v$.stock.$errors.length">
              <li v-for="error in v$.stock.$errors" :key="error.$uid" class="mt-1 text-sm leading-6 text-red-600">
                {{ error.$message }}
              </li>
            </ul>
          </div>

          <div class="sm:col-span-2">
            <label for="discount" class="block text-sm font-medium leading-6 text-gray-900">Discount %</label>
            <div class="mt-2">
              <input
                id="discount"
                v-model="v$.discount.$model"
                type="number"
                name="discount"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
            <ul v-if="v$.discount.$errors.length">
              <li v-for="error in v$.discount.$errors" :key="error.$uid" class="mt-1 text-sm leading-6 text-red-600">
                {{ error.$message }}
              </li>
            </ul>
          </div>

          <div class="col-span-full">
            <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
            <div class="mt-2">
              <textarea
                id="description"
                v-model="v$.description.$model"
                name="description"
                rows="3"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <ul v-if="v$.description.$errors.length">
              <li v-for="error in v$.description.$errors" :key="error.$uid" class="mt-1 text-sm leading-6 text-red-600">
                {{ error.$message }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">
        Cancel
      </button>
      <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Update
      </button>
    </div>
  </form>
</template>
