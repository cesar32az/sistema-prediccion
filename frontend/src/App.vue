<template>
  <v-app>
    <router-view></router-view>
    <!-- Notificaciones -->
    <v-snackbar
      v-model="snackbar.snack"
      :timeout="1000"
      :color="snackbar.color"
      centered
      multi-line
      elevation="24"
    >
      <span class="text-h6">{{ snackbar.message }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar.snack = false" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {},

  data: () => ({}),
  computed: {
    ...mapState({
      snackbar: state => state.notify.snackbar,
    }),
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
