<template>
  <v-container>
    <!-- APP BAR -->
    <v-app-bar
      dark
      app
      color="#6A76AB"
      shrink-on-scroll
      src="https://picsum.photos/1920/1080?random"
      prominent
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right,rgba(25,32,72,.7), rgba(100,115,201,.5)  "
        ></v-img>
      </template>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Centro de Salud de Sacatepéquez</v-toolbar-title>
      <v-spacer />
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="logUserOut" v-bind="attrs" v-on="on">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Cerrar sesión</span>
      </v-tooltip>
    </v-app-bar>
    <!-- DRAWER -->
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list nav>
        <v-list-item-group v-model="group" active-class="primary--text text--accent-4">
          <v-list-item link :to="{ name: 'Home' }" exact>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-group prepend-icon="mdi-calendar-check" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Consultas</v-list-item-title>
              </v-list-item-content>
            </template>
             <v-list-item link to="/add-consulta">
              <v-list-item-title>Agregar</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item link to="/registros">
              <v-list-item-title>Registros</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-calendar</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-group prepend-icon="mdi-account-multiple" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Pacientes</v-list-item-title>
              </v-list-item-content>
            </template>
       
            <v-list-item link to="/add-paciente">
              <v-list-item-title>Agregar</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-account-multiple-plus</v-icon>
              </v-list-item-icon>
            </v-list-item>
             <v-list-item link to="/pacientes">
              <v-list-item-title>Buscar</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-magnify-scan</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-item link to="/ajustes" exact>
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ajustes</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      editar: false,
      drawer: false,
      group: false,
    };
  },

  methods: {
    logUserOut() {
      localStorage.removeItem('jwt');
      this.$router.push('/login');
    },
  },
};
</script>

<style></style>
