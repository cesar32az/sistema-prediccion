<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="5">
      <v-card min-width="100%" max-width="45rem" rounded="xl" outlined>
        <v-form @submit.prevent="loginUser">
          <v-card-title class="justify-center ma-3">
            <v-img :src="logo" max-width="100%" height="200" />
          </v-card-title>
          <v-card-subtitle class="d-flex align-center justify-center">
            <h3 class="text-h3">Iniciar Sesión</h3>
          </v-card-subtitle>
          <v-card-text class="pa-5">
            <v-row class="mx-2 mb-4">
              <v-text-field
                outlined
                prepend-icon="mdi-account"
                label="Ingresa tu correo"
                color="primary"
                name="email"
                :rules="rulesName"
                v-model="user.email"
                validate-on-blur
              />
            </v-row>
            <v-row class="mx-2">
              <v-text-field
                outlined
                prepend-icon="mdi-lock"
                label="ingresa tu contrseña"
                name="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                :rules="[rulesPass.required]"
                @click:append="show = !show"
                v-model="user.password"
                validate-on-blur
              />
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row justify="center">
              <v-col cols="6" md="6" class="d-flex justify-center">
                <v-btn large text color="primary" type="submit">
                  iniciar sesión
                </v-btn>
              </v-col>
              <v-col cols="6" md="6" class="d-flex justify-center">
                <v-btn text large color="accent" :to="{ name: 'Register' }">
                  registrarse
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'FormLogin',
  data() {
    return {
      logo: './img/logo.png',
      user: {
        email: '',
        password: '',
      },
      show: false,
      rulesPass: {
        required: value => !!value || 'Contraseña requerida',
      },
      rulesName: [v => !!v || 'Email requerido'],
    };
  },
  computed: {
    //obtener estado si esta loggeado o no
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
      errorNotify: 'notify/errorNotify',
      successNotify: 'notify/successNotify',
    }),
    async loginUser() {
      try {
        let response = await this.$http.post('/api/auth/login', this.user);
        let token = response.data.token;
        if (token) {
          //console.log({ token });
          localStorage.setItem('jwt', token);
          this.$router.push('/');
          this.successNotify('Bienvenido');
          return;
        }
      } catch (error) {
        //let err = error?.response;
        //let message = err.data.message;
        //this.errorNotify(message);
        console.log(error);
      }
    },
  },
  mounted() {
    //si esta logueado redirecciona a /profile
    if (this.loggedIn) {
      //this.$router.push('/profile');
    }
  },
};
</script>
