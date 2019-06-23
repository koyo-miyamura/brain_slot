<template>
  <v-app>
    <v-toolbar app color="teal" dark>
      <v-toolbar-title class="headline">
        <span class="font-weight-bold">Brain Slot!!</span>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn flat to="/">
          Slot
        </v-btn>
        <v-btn flat to="/card">
          Card
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      //
    };
  }
};
</script>
