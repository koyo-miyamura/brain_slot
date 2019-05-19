<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span class="font-weight-bold">Brain Slot!!</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <SlotContent />
    </v-content>
  </v-app>
</template>

<script>
import SlotContent from "@/components/SlotContent";

export default {
  name: "App",
  components: {
    SlotContent
  },
  data() {
    return {
      //
    };
  }
};
</script>
