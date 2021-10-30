<template>
  <v-container>
    <Profile />
    <v-img src="img/vacuno.jpg"></v-img>
  </v-container>
</template>

<script>
import Profile from '../components/pages/home/Saludo.vue';
export default {
  name: 'Home',

  components: { Profile },
};
</script>
