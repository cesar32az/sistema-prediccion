<template>
  <v-footer app absolute class="font-weight-medium" dark color="grey darken-4">
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} —
      <strong>Grupo 8</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
  }),
};
</script>
