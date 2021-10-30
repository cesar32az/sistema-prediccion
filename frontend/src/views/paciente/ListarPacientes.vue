<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Pacientes ingresados
            <v-spacer> </v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            />
          </v-card-title>
          <v-data-table :headers="headers" :items="pacientes" :search="search">
            <!-- Actions -->
            <template v-slot:item.actions="{ item }">
              <v-icon color="error" @click="deletePaciente(item)"> mdi-delete </v-icon>
            </template>
            <!-- No data -->
            <template v-slot:no-data>No hay ningún héroe</template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { authHeader } from '../../services/auth-header.service';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'AgregarConsulta',
  data() {
    return {
      search: '',
      pacientes: [],
      headers: [
        { text: 'Expediente', value: 'expedient.expedient' },
        { text: 'Nombre', value: 'name' },
        { text: 'Nacimiento', value: 'birthDate' },
        { text: 'Departamento', value: 'department' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    ...mapActions({
      errorNotify: 'notify/errorNotify',
      successNotify: 'notify/successNotify',
    }),
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
    async deletePaciente(paciente) {
      try {
        console.log(paciente._id)
        const id = paciente._id;
        const response = await this.$http.delete(`/api/patient/${id}`);
        const message = response.data.message;
        console.log(response.data)
        this.pacientes = this.pacientes.filter(paciente => paciente._id !== id);
        this.successNotify(message);
      } catch (error) {
        console.log(error);
        const message = error.response.data.message;
        return message;
      }
    },
  },
  mounted() {
    this.getPacientes();
  },
};
</script>

<style></style>
