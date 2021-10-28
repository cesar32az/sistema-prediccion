<template>
  <v-container fill-height>
    <LoginForm class="d-flex align-center justify-center" />
  </v-container>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue';
export default {
  components: {
    LoginForm,
  },
};
</script>

<style></style>
