<template>
  <div class="card flex justify-center">
    <Chart 
      type="doughnut"
      :data="data"
      :options="options"
      class="w-full md:w-[30rem]"
    />
  </div>
</template>

<script setup>
import Chart from 'primevue/chart';

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    default: () => ({})
  }
});
</script>