<template>
  <v-container>
    <PieChart :chartdata="chartdata" :options="options" v-if="show" />
    <v-row justify="center" v-if="!show">
      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-subtitle class="text-center">
            Aún no has agregado tu presupuesto
            {{ disponible }}
          </v-card-subtitle>
          <v-card-actions class="justify-center">
            <v-btn outlined color="indigo accent-3" to="/presupuesto">ir a presupuesto</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { authHeader } from '../../../services/auth-header.service';
import PieChart from '../../charts/PieChart.vue';
export default {
  name: 'Estadisticas',
  components: { PieChart },
  data() {
    return {
      show: false,
      chartdata: {
        type: 'pie',
        labels: ['Disponible', 'Gastado'],
        datasets: [
          {
            label: 'Total A',
            data: [0, 0],
            backgroundColor: ['#FF1744', '#304FFE'],
          },
        ],
      },
      options: {
        animation: {
          animateScale: true,
        },
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: '',
          fontColor: 'white',
          fontSize: 20,
        },
        legend: {
          labels: {
            fontColor: 'white',
            fontSize: 16,
          },
        },
        tooltips: {
          bodyFontSize: 14,
          titleFontSize: 16,
        },
      },
      presupuesto: null,
      disponible: null,
      totalGastos: 0,
    };
  },

  methods: {
    async getPresupuesto() {
      try {
        let response = await this.$http.get('/api/presupuesto', { headers: authHeader() });
        let presupuesto = response.data.presupuesto.presupuesto;
        return presupuesto;
      } catch (error) {
        console.log(error);
      }
    },
    async getTotalGasto() {
      try {
        let response = await this.$http.get('/api/gastos/total', { headers: authHeader() });
        let totalGastos = response.data.totalGastos;
        return totalGastos;
      } catch (error) {
        console.log(error);
      }
    },
    async fillChart() {
      try {
        let totalGastos = await this.getTotalGasto();
        let presupuesto = await this.getPresupuesto();
        totalGastos ? (this.totalGastos = totalGastos) : (this.totalGastos = 0);
        if (presupuesto) {
          let disponible = presupuesto - totalGastos;
          this.disponible = disponible;
          this.options.title.text = `Presupuesto total: ${presupuesto}`;
          this.chartdata.datasets[0].data[0] = disponible;
          this.chartdata.datasets[0].data[1] = totalGastos;
          this.show = true;
        } else {
          this.show = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.fillChart();
  },
};
</script>

<style></style>
