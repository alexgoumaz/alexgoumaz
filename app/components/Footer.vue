<template>
  <footer class="bg-red-600 text-white py-6 mt-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
      <span>© 2025 Lenox HR. Todos los derechos reservados.</span>
      <div class="flex space-x-4 mt-2 md:mt-0">
        <NuxtLink to="/" class="hover:text-red-200 transition">Inicio</NuxtLink>
        <NuxtLink to="/employees" class="hover:text-red-200 transition">Empleados</NuxtLink>
        <NuxtLink to="/vacaciones" class="hover:text-red-200 transition">Vacaciones</NuxtLink>
        <NuxtLink to="/perfil" class="hover:text-red-200 transition">Perfil</NuxtLink>
      </div>
    </div>
  </footer>
</template>
