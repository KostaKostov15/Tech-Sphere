<script setup>
import { onMounted, ref, watch } from 'vue';
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue';
import { Bars3Icon, ShoppingBagIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import navigation from '../../utils/navigation';
import { paths } from '../../utils/paths';
import Cart from '../Cart.vue';
import logo from '../../assets/logo.png';
import { getLatest } from '../../services/productService';
import MobileHeader from './MobileHeader.vue';

const router = useRouter();
const { clearCart } = useCartStore();
const { logoutUser } = useAuthStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
const { products } = storeToRefs(cartStore);
const { isAuthenticated } = storeToRefs(authStore);

const isOpen = ref(false);
const isCartOpen = ref(false);
const isItemAddedToCart = ref(false);
const featuredItems = ref([]);

onMounted(async () => {
  featuredItems.value = await getLatest();
  navigation.categories.featured = featuredItems.value;
});

watch(products, () => {
  isItemAddedToCart.value = true;
  setTimeout(() => {
    isItemAddedToCart.value = false;
  }, 300);
}, { deep: true });

function toggleCart() {
  isCartOpen.value = !isCartOpen.value;
}

async function logoutHandler() {
  await logoutUser();
  clearCart();

  router.push(paths.home);
}

function changeIsOpen(value) {
  isOpen.value = value;
}
</script>

<template>
  <div class="bg-white z-20">
    <MobileHeader :is-open="isOpen" @change-is-open="(value) => changeIsOpen(value)" />

    <header class="relative bg-white z-40">
      <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="flex h-16 items-center">
            <button type="button" class="relative rounded-md bg-white p-2 text-gray-400 lg:hidden" @click="isOpen = true">
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Logo -->
            <div class="ml-4 flex lg:ml-0">
              <router-link :to="paths.home">
                <span class="sr-only">Tech Sphere</span>
                <img class="h-8 w-auto" :src="logo" alt="site-logo">
              </router-link>
            </div>

            <!-- Flyout menus -->
            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="flex h-full space-x-8">
                <Popover
                  v-for="category in navigation.categories"
                  :key="category.name"
                  v-slot="{ open, close }"
                  class="flex"
                >
                  <div class="relative flex">
                    <PopoverButton class="relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out" :class="[open ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:text-gray-800']">
                      {{ category.name }}
                    </PopoverButton>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <PopoverPanel class="absolute inset-x-0 top-full text-sm text-gray-500">
                      <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                      <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                      <div class="relative bg-white">
                        <div class="mx-auto max-w-7xl px-8">
                          <div class="grid grid-cols-1 gap-x-8 gap-y-10 py-8">
                            <div class="grid grid-cols-5 justify-center gap-x-8">
                              <div v-for="item in featuredItems" :key="item._id" class="group relative text-base sm:text-sm">
                                <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <img :src="item.imageUrl" :alt="item.title" class="object-cover object-center">
                                </div>
                                <router-link :to="`/store/${item._id}/details`" class="mt-6 block font-medium text-gray-900" @click="close">
                                  <span class="absolute inset-0 z-10" aria-hidden="true" />
                                  {{ item.title }}
                                </router-link>
                                <p aria-hidden="true" class="mt-1">
                                  Shop now
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>

                <template v-for="page in navigation.pages">
                  <router-link
                    v-if="page.validation ? page.validation === isAuthenticated : true"
                    :key="page.name"
                    :to="page.to"
                    class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {{ page.name }}
                  </router-link>
                </template>
              </div>
            </PopoverGroup>

            <div class="ml-auto flex items-center">
              <template v-if="!isAuthenticated">
                <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <router-link :to="paths.login" class="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </router-link>

                  <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <router-link :to="paths.register" class="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </router-link>
                </div>
              </template>

              <template v-else>
                <router-link :to="paths.profile">
                  <p class="mr-6 flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                    Profile
                  </p>
                </router-link>
                <button class="text-sm font-medium text-gray-700 hover:text-gray-800" @click="logoutHandler">
                  Logout
                </button>

                <div class="ml-4 flow-root lg:ml-6">
                  <a class="cursor-pointer group -m-2 flex items-center p-2" @click="toggleCart">
                    <ShoppingBagIcon :class="isItemAddedToCart ? 'text-green-400 transition h-8 w-8' : 'text-gray-400'" class="h-6 w-6 flex-shrink-0 group-hover:text-gray-500" aria-hidden="true" />
                    <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{{ products.length }}</span>
                    <span class="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </template>

              <!-- Cart -->
              <Cart v-if="isCartOpen" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
