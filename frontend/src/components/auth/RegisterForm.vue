<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <h3 class="text-h3 text-center mb-10">Regístrate</h3>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step editable :complete="e1 > 1" step="1">
            Crea tu Usuario
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable :complete="e1 > 2" step="2">
            Cuéntanos de tí
          </v-stepper-step>
        </v-stepper-header>
        <v-form @submit.prevent="registerUser">
          <v-stepper-items>
            <!-- CREAR USUARIO -->
            <v-stepper-content step="1">
              <v-card class="mb-5 pt-5" outlined>
                <v-row justify="center" align="center" class="mt-2">
                  <v-col cols="12" md="8">
                    <v-text-field
                      class="mx-5"
                      label="Ingresa tu correo"
                      prepend-icon="mdi-at"
                      outlined
                      v-model="register.email"
                      :rules="rulesEmail"
                      validate-on-blur
                    />
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="12" md="8"
                    ><v-text-field
                      class="mx-5"
                      outlined
                      prepend-icon="mdi-lock"
                      label="ingresa tu contrseña"
                      name="password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      :rules="[rulesPass.required]"
                      @click:append="show = !show"
                      v-model="register.password"
                      validate-on-blur
                  /></v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="12" md="6">
                    <div class="text-center pb-5">
                      <small>*todos los campos son obligatorios*</small>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
              <v-row justify="center" class="pa-5">
                <v-col cols="12" md="6" class="d-flex justify-start">
                  <v-btn color="primary" class="ml-5" @click="e1++">Continue</v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12" md="6">
                  <v-row justify="center" align="center">
                    <v-col cols="6" class="d-flex justify-md-end">
                      <small class="">¿Ya tienes cuenta?</small>
                    </v-col>
                    <v-col cols="6">
                      <v-btn text color="accent" :to="{ name: 'Login' }" exact>Inicia Sesion</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-stepper-content>
            <!-- CUENTANOS DE TI -->
            <v-stepper-content step="2">
              <v-card class="mb-5 pt-5" outlined>
                <v-row justify="center" align="center" class="mt-2">
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="mx-5"
                      label="Ingresa tu nombre"
                      prepend-icon="mdi-account"
                      outlined
                      v-model="register.name"
                      :rules="rulesCamp"
                      validate-on-blur
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="mx-5"
                      label="Ingresa tu apellido"
                      prepend-icon="mdi-account"
                      outlined
                      v-model="register.lastName"
                      :rules="rulesCamp"
                      validate-on-blur
                    />
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="12" md="6">
                    <!-- Fecha de nacimiento -->
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          class="mx-5"
                          v-model="register.birthDate"
                          label="Selecciona tu fecha de nacimiento"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        color="primary"
                        min="1940-01"
                        :max="hoy"
                        v-model="register.birthDate"
                        @input="menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="12" md="6">
                    <div class="text-center pb-5">
                      <small>*todos los campos son obligatorios*</small>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
              <v-row class="pa-5">
                <v-col cols="12" md="6" class="d-flex justify-space-between">
                  <v-btn color="primary" type="submit">Registrarse</v-btn>
                  <v-btn text @click="e1--">regresar</v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12" md="6">
                  <v-row justify="center" align="center">
                    <v-col cols="6" class="d-flex justify-md-end">
                      <small class="">¿Ya tienes cuenta?</small>
                    </v-col>
                    <v-col cols="6">
                      <v-btn text color="accent" :to="{ name: 'Login' }" exact>Inicia Sesion</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-form>
      </v-stepper>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      register: {
        name: '',
        lastName: '',
        email: '',
        password: '',
        name: '',
        birthDate: '',
      },
      e1: 1,
      menu: false,
      hoy: new Date().toISOString().substr(0, 10),
      //passwords
      show: false, //show de pass
      //reglas
      rulesCamp: [v => !!v || 'Campo requerido'],
      rulesPass: {
        required: value => !!value || 'Contraseña requerida',
      },
      rulesEmail: [
        v => !!v || 'Tu e-mail es requerido',
        v =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
            v,
          ) || 'E-mail inválido',
      ],
    };
  },
  computed: {
    //obtener estado si esta loggeado o no
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    //si esta logueado redirecciona a /profile
    /* if (this.loggedIn) {
      this.$router.push('/home');
    } */
  },
  methods: {
    ...mapActions({
      errorNotify: 'notify/errorNotify',
      successNotify: 'notify/successNotify',
    }),
    /*registro de usuario*/
    async registerUser() {
      try {
        let data = this.register;
        const response = await this.$http.post('/api/auth/register', data);
        //console.log(response);
        let message = response.data.message;
        this.$router.push('/login');
        this.successNotify(message);
      } catch (error) {
        let message = error.response?.data.message;
        this.errorNotify(message)
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
