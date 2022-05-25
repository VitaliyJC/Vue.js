<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn plain :ripple="false" to="/">My personal costs</v-btn>
      <v-btn plain :ripple="false" to="/mycalc">First calcilator</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
