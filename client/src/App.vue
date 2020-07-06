<template>
  <v-app>
    <v-app-bar app
      color="dark"
      dense
      dark
      v-if="$route.name != 'Login'"
    >
      <v-toolbar-title>Blockchain Simulation</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn class="mr-2" outlined color="white" to="/">Home</v-btn>
      <v-btn class="mr-2" outlined color="white" to="/mining">Mining</v-btn>
      <v-btn class="mr-2" outlined color="white" to="/transaction">Create Transactions</v-btn>

    </v-app-bar>

    <v-main>

      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
