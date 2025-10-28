<template>
  <div class="card p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800 inline-block">

    <div v-if="title" class="mb-4">
      <h3 class="text-lg font-semibold">{{ title }}</h3>
    </div>

   
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.12);
}
</style>
