<template>
  <v-container>
      <h1 class="text-center">Morbilidades por mes</h1>
    <BarChart/>
  </v-container>
</template>

<script>
import BarChart from '../components/charts/BarChart.vue'

export default {
  name: 'Graficas',
  components: {BarChart}

};
</script>
