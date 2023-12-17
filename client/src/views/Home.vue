<script setup>
import { paths } from '../utils/paths';
</script>

<template>
  <div class="relative overflow-hidden bg-white">
    <div class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
      <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <div class="sm:max-w-lg">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Unwrap the Magic This Christmas
          </h1>
          <p class="mt-4 text-xl text-gray-500">
            This festive season, TechSphere brings you a sleigh-full of tech wonders to light up your celebrations. Our latest collection is more than gifts. It's the spirit of innovation wrapped in the joy of Christmas.
          </p>
        </div>
        <div>
          <div class="mt-10">
            <!-- Decorative image grid -->
            <div aria-hidden="true" class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
              <div class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <div class="flex items-center space-x-6 lg:space-x-8">
                  <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div class="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                      <img src="https://images.unsplash.com/photo-1570891836654-d4961a7b6929?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="iPhone" class="h-full w-full object-cover object-center">
                    </div>
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Macbook" class="h-full w-full object-cover object-center">
                    </div>
                  </div>
                  <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img src="https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Samsung Phone" class="h-full w-full object-cover object-center">
                    </div>
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img src="https://images.unsplash.com/photo-1693206578601-21cdc341d2c8?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Acer Laptop" class="h-full w-full object-cover object-center">
                    </div>
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img src="https://images.unsplash.com/photo-1598327105854-c8674faddf79?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Xiaomi Phone" class="h-full w-full object-cover object-center">
                    </div>
                  </div>
                  <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1415&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="iPad" class="h-full w-full object-cover object-center">
                    </div>
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img src="https://images.unsplash.com/photo-1620288650879-20db0eb38c05?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sabsung Tab" class="h-full w-full object-cover object-center">
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <router-link
              :to="paths.addProduct"
              class="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
            >
              Shop
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
