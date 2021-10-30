<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-card>
          <v-card-title>
            Consultas ingresadas
            <v-spacer> </v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar paciente"
              single-line
              hide-details
            />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="registros"
            :search="search"
            @click:row="selectPaciente"
          >
            <!-- No data -->
            <template v-slot:no-data>No hay ningún héroe</template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="selectedPacientes" justify="center">
      <v-col cols="4" class="d-flex justify-center">
        <v-btn outlined @click="clean">limpiar</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="selectedPacientes">
      <v-col
        cols="6"
        v-for="(consulta, index) in selectedPacientes.expedient.consults"
        :key="index"
      >
        <v-card>
          <v-card-title class="mt-5">
            <h2 class="mt-5">Fecha: {{moment(consulta.date).format("MMMM D, YYYY")}}</h2>
          </v-card-title>
          <v-card-text>
            <!-- morbilidad -->
            <v-row justify="center">
              <v-card>
                <v-card-title>
                  Morbilidades ingresadas
                </v-card-title>
                <v-data-table
                  :headers="headersMorbilidad"
                  :items="consulta.morbilidad"
                  :items-per-page="5"
                />
              </v-card>
            </v-row>
            <!-- medicamento -->
            <v-row justify="center" class="mt-10">
              <v-card>
                <v-card-title>
                  Medicamentos ingresados
                </v-card-title>
                <v-data-table
                  :headers="headersMedicamento"
                  :items="consulta.medicaments"
                  :items-per-page="5"
                />
              </v-card>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" v-else class="mt-15">
      <v-card outlined height="5rem" class="pa-5 d-flex justify-center align-center">
        <h3>Selecciona algún paciente</h3>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { authHeader } from '../../services/auth-header.service';
import { mapActions } from 'vuex';
import moment from 'moment';
moment.locale('es')
export default {
  name: 'Registros',
  data() {
    return {
      search: '',
      registros: [],
      headers: [
        { text: 'Expediente', value: 'expedient.expedient' },
        { text: 'Nombre', value: 'name' },
        { text: 'Fecha de nacimiento', value: 'birthDate' },
      ],
      headersMedicamento: [
        { text: 'Nombre', value: 'name' },
        { text: 'presentacion', value: 'presentation' },
      ],
      headersMorbilidad: [
        { text: 'codigo', value: 'codigo' },
        { text: 'Descripcion', value: 'name' },
      ],
      selectedPacientes: null,
    };
  },
  methods: {
    moment,
    ...mapActions({
      errorNotify: 'notify/errorNotify',
      successNotify: 'notify/successNotify',
    }),
    selectPaciente(value) {
      this.selectedPacientes = null;

      this.selectedPacientes = value;
      console.log(this.selectedPacientes);
    },
    async getPacientes() {
      try {
        let response = await this.$http.get('/api/patient', { headers: authHeader() });
        let pacientes = [];
        pacientes = response.data.patients;

        pacientes = pacientes.map(paciente => {
          paciente.birthDate = new Date(paciente.birthDate).toLocaleDateString('es-es', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

          return paciente;
        });
        this.registros = pacientes;
      } catch (error) {
        console.log(error);
      }
    },
    clean() {
      this.selectedPacientes = null;
    },
  },
  mounted() {
    this.getPacientes();
  },
};
</script>

<style></style>
