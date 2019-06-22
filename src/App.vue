<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span class="font-weight-bold">Brain Slot!!</span>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn flat>
          <router-link to="/" tag="span">Slot mode!!</router-link>
        </v-btn>
        <v-btn flat>
          <router-link to="/card" tag="span">Card mode!!</router-link>
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
