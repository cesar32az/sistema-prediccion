<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6" md="6" class="d-flex justify-center justify-md-end px-1">
        <v-btn outlined color="pink accent-2" to="/calendario">
          <v-icon left>
            mdi-calendar
          </v-icon>
          calendario
        </v-btn>
      </v-col>
      <v-col cols="6" md="6" class="d-flex justify-center justify-md-start">
        <v-btn color="primary" to="/gastos">
          <v-icon left>
            mdi-currency-usd
          </v-icon>
          ver gastos
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'BotonesHome',
};
</script>

<style></style>
