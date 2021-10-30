<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Infecciones respiratorias',
          backgroundColor: '#f87979',
          data: Array.from({length: 12}, () => Math.floor(Math.random() * 40))
        },
        {
          label: 'Enfermedades transmitidas por alimentos',
          backgroundColor: '#73a5f5',
          data: Array.from({length: 12}, () => Math.floor(Math.random() * 40))
        },
        {
          label: 'Enfermedades transmitidas por vectores',
          backgroundColor: '#73f5b6',
          data: Array.from({length: 12}, () => Math.floor(Math.random() * 40))
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
