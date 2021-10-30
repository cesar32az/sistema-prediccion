<template>
  <v-container>
    <!-- busqueda de paciente -->
    <v-row justify="space-between">
      <v-col cols="12" md="4" class="d-flex align-center justify-center ml-10">
        <!-- fecha consulta -->
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
              v-model="fecha"
              label="Fecha de consulta"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
              outlined
            ></v-text-field>
          </template>
          <v-date-picker
            color="primary"
            min="1940-01"
            :max="hoy"
            v-model="fecha"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="6">
        <!-- tabla de pacientes -->
        <v-card>
          <v-card-title>
            Pacientes
            <v-spacer> </v-spacer>
            <v-text-field
              v-model="searchPaciente"
              append-icon="mdi-magnify"
              label="Buscar paciente"
              single-line
              hide-details
            />
          </v-card-title>
          <v-data-table
            :headers="headersPaciente"
            :search="searchPaciente"
            :items="pacientes"
            :items-per-page="5"
            @click:row="selectPaciente"
          >
            <!-- No data -->
            <template v-slot:no-data>No hay ningún paciente</template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <!-- registro -->
    <v-row justify="space-between">
      <v-col cols="12" md="5">
        <!-- morbilidades -->
        <v-row justify="center" class="mt-5">
          <v-card>
            <v-card-title>
              Morbilidades
              <v-spacer> </v-spacer>
              <v-text-field
                v-model="searchMorbilidad"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              />
            </v-card-title>
            <v-data-table
              :headers="headersMorbilidad"
              :search="searchMorbilidad"
              :items="morbilidades"
              :items-per-page="5"
              @click:row="selectMorbilidad"
            >
              <!-- No data -->
              <template v-slot:no-data>No hay ninguna morbilidad</template>
            </v-data-table>
          </v-card>
        </v-row>
        <!-- medicamentos -->
        <v-row justify="center" class="mt-10">
          <v-card>
            <v-card-title>
              Medicamentos
              <v-spacer> </v-spacer>
              <v-text-field
                v-model="searchMedicamnento"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              />
            </v-card-title>
            <v-data-table
              :headers="headersMedicamento"
              :search="searchMedicamnento"
              :items="medicamentos"
              :items-per-page="5"
              @click:row="selectMedicamento"
            >
              <!-- No data -->
              <template v-slot:no-data>No hay ningún medicamento</template>
            </v-data-table>
          </v-card>
        </v-row>
      </v-col>
      <!-- resumen de consulta -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="justify-center mt-5">
            <h2 class="mt-5">Consulta por ingresar</h2>
          </v-card-title>
          <v-card-text>
            <!-- paciente -->
            <v-row justify="center" class="mt-6">
              <v-col class="px-15">
                <v-row>
                  <v-text-field
                    outlined
                    label="Expediente"
                    color="primary"
                    disabled
                    v-model="selectedPacientes.expedient.expedient"
                  />
                </v-row>
                <v-row>
                  <v-text-field
                    outlined
                    label="Nombre del paciente"
                    color="primary"
                    disabled
                    v-model="selectedPacientes.name"
                  />
                </v-row>
              </v-col>
            </v-row>
            <!-- morbilidad -->
            <v-row justify="center">
              <v-card>
                <v-card-title>
                  Morbilidades ingresadas
                </v-card-title>
                <v-data-table
                  :headers="headersMorbilidad"
                  :items="selectedMorbilidades"
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
                  :items="selectedMedicamentos"
                  :items-per-page="5"
                />
              </v-card>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- botones -->
    <v-row justify="center" class="mt-10">
      <v-col cols="6">
        <v-btn @click="saveConsulta()">guardar</v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn @click="cleanData()">Limpiar datos</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { medicamentos } from './medicamentos';
import { morbilidades } from './morbilidades';
import { authHeader } from '../../services/auth-header.service';
import { mapActions } from 'vuex';
export default {
  name: 'AgregarConsulta',
  data() {
    return {
      fecha: '',
      menu: false,
      hoy: new Date().toISOString().substr(0, 10),
      pacientes: [],
      medicamentos: medicamentos,
      morbilidades: morbilidades,
      searchPaciente: '',
      searchMedicamnento: '',
      searchMorbilidad: '',
      headersMedicamento: [
        { text: 'Nombre', value: 'name' },
        { text: 'presentacion', value: 'presentation' },
      ],
      headersMorbilidad: [
        { text: 'codigo', value: 'codigo' },
        { text: 'Descripcion', value: 'name' },
      ],
      headersPaciente: [
        { text: 'Expediente', value: 'expedient.expedient' },
        { text: 'Nombre', value: 'name' },
        { text: 'Nacimiento', value: 'birthDate' },
        { text: 'Departamento', value: 'department' },
      ],
      selectedPacientes: {
        name: '',
        expedient: { _id: '', expedient: '' },
      },
      selectedMedicamentos: [],
      selectedMorbilidades: [],
    };
  },
  methods: {
    ...mapActions({
      errorNotify: 'notify/errorNotify',
      successNotify: 'notify/successNotify',
    }),
    selectPaciente(value) {
      this.selectedPacientes = value;
    },
    selectMorbilidad(value) {
      console.log(value);
      this.selectedMorbilidades.push(value);
    },
    selectMedicamento(value) {
      console.log(value);
      this.selectedMedicamentos.push(value);
    },
    async saveConsulta() {
      try {
        if (
          !this.fecha ||
          !this.selectedPacientes ||
          !this.selectedMedicamentos | this.selectedMorbilidades
        ) {
          this.errorNotify('Complete all parameters!');
          return;
        }
        const expedient_id = this.selectedPacientes.expedient._id;
        const consulta = {
          medicamentos: this.selectedMedicamentos,
          morbilidades: this.selectedMorbilidades,
          fecha: this.fecha,
        };

        const response = await this.$http.put(`/api/expedient/${expedient_id}`, consulta);
        const message = response.data.message;

        this.successNotify(message);
        this.cleanData();
      } catch (error) {
        this.errorNotify('Error saving!');
        console.log(error);
      }
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
        this.pacientes = pacientes;
      } catch (error) {
        console.log(error);
      }
    },
    cleanData() {
      this.selectedPacientes = {
        name: '',
        expedient: { _id: '', expedient: '' },
      };
      this.selectedMedicamentos = [];
      this.selectedMorbilidades = [];
    },
  },
  mounted() {
    this.getPacientes();
  },
};
</script>

<style></style>
