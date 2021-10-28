<template>
  <v-container>
    <Profile />
    <Estadisticas />
    <Botones />
  </v-container>
</template>

<script>
import Botones from '../components/pages/home/Botones.vue';
import Estadisticas from '../components/pages/home/Estadisticas.vue';
import Profile from '../components/pages/home/Saludo.vue';
export default {
  name: 'Home',

  components: { Profile, Estadisticas, Botones },
};
</script>
