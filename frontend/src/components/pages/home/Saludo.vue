<template>
  <v-container>
    <h5 class="text-center text-h5">Hola {{ user.name }}, bienvenido!</h5>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Saludo',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
    }),
  },
  methods: {},
};
</script>

<style></style>
