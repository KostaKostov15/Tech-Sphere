<script setup>
import {
  Dialog,
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

import { storeToRefs } from 'pinia';
import { paths } from '../../utils/paths';
import navigation from '../../utils/navigation';
import { useAuthStore } from '../../store/authStore';

const props = defineProps({
  isOpen: Boolean,
});
const emit = defineEmits(['changeIsOpen']);

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
</script>

<template>
  <TransitionRoot as="template" :show="props.isOpen">
    <Dialog as="div" class="relative z-40 lg:hidden" @close="emit('changeIsOpen', false)">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div class="flex px-4 pb-2 pt-5">
              <button type="button" class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400" @click="emit('changeIsOpen', false)">
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Close menu</span>
                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <!-- Links -->
            <TabGroup as="div" class="mt-2">
              <div class="border-b border-gray-200">
                <TabList class="-mb-px flex space-x-8 px-4">
                  <Tab
                    v-for="category in navigation.categories"
                    :key="category.name"
                    v-slot="{ selected }"
                    as="template"
                  >
                    <button class="flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium" :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900']">
                      {{ category.name }}
                    </button>
                  </Tab>
                </TabList>
              </div>
              <TabPanels as="template">
                <TabPanel v-for="category in navigation.categories" :key="category.name" class="space-y-10 px-4 pb-8 pt-10">
                  <div class="grid grid-cols-2 gap-x-4">
                    <div v-for="item in category.featured" :key="item.name" class="group relative text-sm">
                      <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <img :src="item.imageSrc" :alt="item.imageAlt" class="object-cover object-center">
                      </div>
                      <a :href="item.href" class="mt-6 block font-medium text-gray-900">
                        <span class="absolute inset-0 z-10" aria-hidden="true" />
                        {{ item.name }}
                      </a>
                      <p aria-hidden="true" class="mt-1">
                        Shop now
                      </p>
                    </div>
                  </div>
                  <div v-for="section in category.sections" :key="section.name">
                    <p :id="`${category.id}-${section.id}-heading-mobile`" class="font-medium text-gray-900">
                      {{ section.name }}
                    </p>
                    <ul role="list" :aria-labelledby="`${category.id}-${section.id}-heading-mobile`" class="mt-6 flex flex-col space-y-6">
                      <li v-for="item in section.items" :key="item.name" class="flow-root">
                        <a :href="item.href" class="-m-2 block p-2 text-gray-500">{{ item.name }}</a>
                      </li>
                    </ul>
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>

            <div class="space-y-6 border-t border-gray-200 px-4 py-6">
              <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                <router-link
                  v-if="page.validation ? page.validation === isAuthenticated : true"
                  :to="page.to"
                  class="-m-2 block p-2 font-medium text-gray-900"
                >
                  {{ page.name }}
                </router-link>
              </div>
            </div>

            <div v-if="!isAuthenticated" class="space-y-6 border-t border-gray-200 px-4 py-6">
              <div class="flow-root">
                <router-link
                  :to="paths.login"
                  class="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </router-link>
              </div>
              <div class="flow-root">
                <router-link :to="paths.register" class="-m-2 block p-2 font-medium text-gray-900">
                  Create account
                </router-link>
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
