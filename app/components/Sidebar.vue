<template>
  <div>
    <div class="lg:hidden p-4 bg-white shadow-sm flex justify-start">
      <button @click="toggleMenu" class="text-red-600 focus:outline-none">
        <i
          :class="['pi', isMenuOpen ? 'pi-times' : 'pi-bars']"
          style="font-size: 1.5rem"
        ></i>
      </button>
    </div>

    <aside
      :class="[
        'bg-white shadow-sm w-64 min-h-screen flex flex-col fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out',
        'lg:relative lg:translate-x-0',
        isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <div class="p-6 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-red-600">Lenox HR</h1>
        <button
          @click="closeMenu"
          class="lg:hidden absolute top-4 right-4 text-red-600 focus:outline-none"
        >
          <i class="pi pi-times" style="font-size: 1.5rem"></i>
        </button>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-2">
        <NuxtLink
          to="/"
          @click="closeMenu"
          class="block text-red-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
          active-class="bg-gray-100"
        >
          <i class="pi pi-user" style="font-size: 1rem"> Sobre mi</i>
        </NuxtLink>

        <NuxtLink
          to="/dashboard"
          @click="closeMenu"
          class="block text-red-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
          active-class="bg-gray-100"
        >
          <i class="pi pi-home" style="font-size: 1rem"> Inicio</i>
        </NuxtLink>

        <NuxtLink
          to="/employees"
          @click="closeMenu"
          class="block text-red-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
          active-class="bg-gray-100"
        >
          <i class="pi pi-users" style="font-size: 1rem"> Empleados</i>
        </NuxtLink>

        <NuxtLink
          to="/gamification"
          @click="closeMenu"
          class="block text-red-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
          active-class="bg-gray-100"
        >
          <i class="pi pi-gift" style="font-size: 1rem"> Gamificación</i>
        </NuxtLink>
      </nav>
    </aside>

    <div
      v-if="isMenuOpen"
      @click="closeMenu"
      class="lg:hidden fixed inset-0 bg-black opacity-50 z-40"
    ></div>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import 'primeicons/primeicons.css';


const isMenuOpen = ref(false);


const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>
