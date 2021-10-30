<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="5">
      <v-card min-width="100%" max-width="45rem" rounded="xl" outlined>
        <v-form @submit.prevent="createPaciente">
          <v-card-subtitle class="d-flex align-center justify-center my-4">
            <h3 class="text-h3">Agregar Paciente</h3>
          </v-card-subtitle>
          <v-card-text class="pa-5">
            <v-row class="mx-2 mb-4">
              <v-text-field
                outlined
                prepend-icon="mdi-view-list"
                label="Expediente"
                color="primary"
                :rules="rule"
                v-model="paciente.expedient"
                validate-on-blur
              />
            </v-row>
            <v-row class="mx-2 mb-4">
              <v-text-field
                outlined
                prepend-icon="mdi-account"
                label="Nombre del paciente"
                color="primary"
                :rules="rule"
                v-model="paciente.name"
                validate-on-blur
              />
            </v-row>
            <!-- nacimiento -->
            <v-row justify="center">
              <v-col class="mx-2">
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
                      class=""
                      v-model="paciente.birthDate"
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
                    v-model="paciente.birthDate"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <!-- genero -->
            <v-row class="mx-2 mb-6" justify="center">
              <v-radio-group v-model="paciente.gender" mandatory row>
                <v-radio label="Masculino" value="masculino"></v-radio>
                <v-radio label="Femenino" value="femenino"></v-radio>
              </v-radio-group>
            </v-row>
            <!-- departamento -->
            <v-row class="mx-2 mb-4">
              <v-autocomplete
                outlined
                prepend-icon="mdi-earth"
                label="Departamento"
                color="primary"
                :rules="rule"
                v-model="paciente.department"
                validate-on-blur
                :items="departamentos"
              />
            </v-row>
            <!-- municipio -->
            <v-row class="mx-2 mb-4">
              <v-autocomplete
                outlined
                prepend-icon="mdi-city"
                label="Municipio"
                color="primary"
                :rules="rule"
                v-model="paciente.municipality"
                validate-on-blur
                :items="municipios"
              />
            </v-row>
            <!-- direccion -->
            <v-row class="mx-2 mb-4">
              <v-text-field
                outlined
                prepend-icon="mdi-account"
                label="Direccion del paciente"
                color="primary"
                :rules="rule"
                v-model="paciente.direction"
                validate-on-blur
              />
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row justify="center">
              <v-col cols="6" md="6" class="d-flex justify-center">
                <v-btn large text color="primary" type="submit">
                  Guardar
                </v-btn>
              </v-col>
              <v-col cols="6" md="6" class="d-flex justify-center">
                <v-btn text large color="accent" @click="limpiarDatos">
                  Limpiar datos
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
import { guatemala } from './guatemala';
import { authHeader } from '../../services/auth-header.service';
import { mapActions } from 'vuex';
export default {
  name: 'AgregarConsulta',
  data() {
    return {
      paciente: {
        expedient: '',
        name: '',
        birthDate: '',
        gender: '',
        department: '',
        municipality: '',
        direction: '',
      },
      menu: false,
      hoy: new Date().toISOString().substr(0, 10),
      rule: [v => !!v || 'Campo requerido'],
    };
  },
  computed: {
    departamentos() {
      let department = Object.keys(guatemala)
      return department;
    },
    municipios(){
       let departamento =  this.paciente.department
       let municipios = guatemala[departamento]
       return municipios
    }
  },
  methods: {
    ...mapActions({
      errorNotify: 'notify/errorNotify',
      successNotify: 'notify/successNotify',
    }),
    async createPaciente() {
      try {
        let data = this.paciente;
        const response = await this.$http.post('/api/patient', data, { headers: authHeader() });
        let message = response.data.message;
        this.successNotify(message);
        this.limpiarDatos();
      } catch (error) {
        console.log(error);
        let message = error.data.message;
        this.errorNotify(message);
      }
    },
    limpiarDatos() {
      this.paciente = {
        name: '',
        birthDate: '',
        direction: '',
        gender: '',
        department: '',
        municipality: '',
        expedient: '',
      };
    },
  },
};
</script>

<style></style>
