<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />

    <main class="flex-1 p-6">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue';
</script>
