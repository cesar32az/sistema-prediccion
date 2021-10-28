<template>
  <v-container>
    <v-row justify="center" align="center" v-if="addForm">
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="text-h5">Presupuesto</v-card-title>
          <v-card-text class="px-8">
            <v-text-field
              v-model.number="presupuesto"
              label="Presupuesto mensual"
              prefix="Q."
              outlined
              :readonly="!edit"
              :append-icon="edit ? 'mdi-content-save' : 'mdi-pencil'"
              @click:append="modificarPresupuesto"
            />
            <v-text-field v-model="disponible" label="Disponible" prefix="Q." outlined readonly />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" v-if="!addForm">
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="text-h5">Agrega tu presupuesto</v-card-title>
          <v-card-text class="px-8">
            <v-text-field
              v-model.number="presupuesto"
              label="Nuevo presupuesto"
              prefix="Q."
              outlined
            />
          </v-card-text>
          <v-card-actions>
            <v-btn block @click="agregarPresupuesto">agregar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { authHeader } from '../../../services/auth-header.service';
import { mapActions } from 'vuex';
export default {
  data: () => {
    return {
      // presupuesto y gastos
      presupuesto: null,
      totalGastos: 0,
      // control formulario agregar presupuesto
      addForm: false,
      // control form actualizar presupuesto
      edit: false,
    };
  },
  computed: {
    disponible() {
      return this.presupuesto - this.totalGastos;
    },
  },
  methods: {
    ...mapActions({
      errorNotify: 'notify/errorNotify',
      successNotify: 'notify/successNotify',
    }),
    async agregarPresupuesto() {
      try {
        // post http
        let data = { presupuesto: this.presupuesto };
        let response = await this.$http.post('/api/presupuesto', data, {
          headers: authHeader(),
        });
        // notificacion
        this.addForm = true;
        let message = response.data.message;
        this.successNotify(message);
      } catch (error) {
        let message = error.response.message;
        this.errorNotify(message);
        console.log(error);
      }
    },
    async getPresupuesto() {
      try {
        let response = await this.$http.get('/api/presupuesto', { headers: authHeader() });
        let presupuesto = response.data.presupuesto;
        if (presupuesto) {
          this.presupuesto = presupuesto.presupuesto;
          this.addForm = true;
        } else {
          this.presupuesto = null;
          this.addForm = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getTotalGasto() {
      try {
        let response = await this.$http.get('/api/gastos/total', { headers: authHeader() });
        let totalGastos = response.data.totalGastos;
        if (totalGastos) {
          this.totalGastos = totalGastos;
        } else {
          this.presupuesto = 0;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async modificarPresupuesto() {
      try {
        if (this.edit) {
          // update http
          let data = { presupuesto: this.presupuesto };
          let response = await this.$http.put('/api/presupuesto', data, {
            headers: authHeader(),
          });
          let message = response.data.message;
          this.successNotify(message);
          this.edit = !this.edit;
        } else {
          this.edit = !this.edit;
        }
      } catch (error) {
        let message = error.response.message;
        this.errorNotify(message);
        console.log(error);
      }
    },
  },
  mounted() {
    this.getPresupuesto();
    this.getTotalGasto()
  },
};
</script>

<style></style>
