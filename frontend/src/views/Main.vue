<template>
  <v-container fluid>
    <Header />
    <v-main app>
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-container>
</template>

<script>
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { mapActions } from 'vuex';
export default {
  name: 'Main',
  components: { Header, Footer },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      setProfile: 'auth/setProfile',
    }),
    async getUser() {
      try {
        let token = localStorage.getItem('jwt');
        let response = await this.$http.get('/api/user/profile', {
          headers: { 'x-access-token': token },
        });
        this.setProfile(response.data.user);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
