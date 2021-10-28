<template>
  <v-container fluid>
    <v-row justify="center" v-if="!add">
      <v-col cols="12" md="4" class="d-flex justify-center">
        <v-btn x-large @click="add = !add" color="indigo accent-3"> Agregar gasto </v-btn>
      </v-col>
    </v-row>
    <v-card v-if="add">
      <v-card-title> Agregar gastos </v-card-title>
      <v-card-text>
        <v-row justify="center" class="mt-2">
          <v-col cols="12" md="6">
            <v-text-field v-model="newGasto.gasto" label="En qué gastaste?" outlined />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="newGasto.categoria"
              :items="categorias"
              label="Elige la categoria"
              outlined
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="newGasto.costo"
              label="Cuánto te costó?"
              prefix="Q."
              outlined
            />
          </v-col>
          <v-col cols="12" md="6">
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
                  v-model="newGasto.fecha"
                  label="Fecha de gasto"
                  prepend-inner-icon="mdi-calendar"
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
                v-model="newGasto.fecha"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="agregarGasto" block color="primary">guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { authHeader } from '../../../services/auth-header.service';
import { mapActions } from 'vuex';

export default {
  data: () => {
    return {
      newGasto: {
        gasto: '',
        categoria: '',
        costo: '',
        fecha: '',
      },
      categorias: [
        { text: 'Ropa', value: 'ropa' },
        { text: 'Servicios', value: 'servicios' },
        { text: 'Comida', value: 'comida' },
        { text: 'Otros', value: 'otros' },
      ],
      add: false,
      // input fecha
      menu: false,
      hoy: new Date().toISOString().substr(0, 10),
    };
  },
  methods: {
    ...mapActions({
      errorNotify: 'notify/errorNotify',
      successNotify: 'notify/successNotify',
      addGasto: 'gastos/addGasto',
    }),

    async agregarGasto() {
      try {
        // http
        let data = this.newGasto;
        let response = await this.$http.post('/api/gastos', data, {
          headers: authHeader(),
        });
        this.addGasto(data);
        // notificacion
        let message = response.data.message;
        this.successNotify(message);
        this.add = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
