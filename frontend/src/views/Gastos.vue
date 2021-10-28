<template>
  <v-container>
     <add-gastos class="mb-5"/>
     <list-gastos/>
  </v-container>
</template>

<script>
import AddGastos from '../components/pages/gastos/AddGastos.vue'
import ListGastos from '../components/pages/gastos/ListGastos.vue'
export default {
  name: 'Gastos',
  components: { AddGastos, ListGastos },
  updated(){
    console.log("gastos updated!")
  }
}
</script>

<style>

</style>