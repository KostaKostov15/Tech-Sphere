<script setup>
import { } from '@heroicons/vue/24/solid';
</script>

<template>
  <form class="p-14 bg-white m-auto" novalidate autocomplete="off">
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
            <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Category</label>
            <div class="mt-2">
              <select
                id="country"
                name="country"
                autocomplete="country-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="smartphones">
                  Smartphones
                </option>
                <option value="laptops">
                  Laptops
                </option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="brand" class="block text-sm font-medium leading-6 text-gray-900">Brand</label>
            <div class="mt-2">
              <input
                id="brand"
                type="text"
                name="brand"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
            <div class="mt-2">
              <input
                id="title"
                type="text"
                name="title"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
          </div>

          <div class="col-span-full">
            <label for="imageUrl" class="block text-sm font-medium leading-6 text-gray-900">Image URL</label>
            <div class="mt-2">
              <input
                id="imageUrl"
                type="text"
                name="imageUrl"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
          </div>

          <div class="sm:col-span-2 sm:col-start-1">
            <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
            <div class="mt-2">
              <input
                id="price"
                type="number"
                name="price"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="stock" class="block text-sm font-medium leading-6 text-gray-900">Stock</label>
            <div class="mt-2">
              <input
                id="stock"
                type="number"
                name="stock"
                autocomplete="address-level1"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="discountPercentage" class="block text-sm font-medium leading-6 text-gray-900">Discount %</label>
            <div class="mt-2">
              <input
                id="discountPercentage"
                type="number"
                name="discountPercentage"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
          </div>

          <div class="col-span-full">
            <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
            <div class="mt-2">
              <textarea
                id="description"
                name="description"
                rows="3"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">
        Cancel
      </button>
      <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Save
      </button>
    </div>
  </form>
</template>
