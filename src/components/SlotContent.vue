<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-img :src="selectedImage" class="my-3" contain height="400"></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="font-weight-bold">
          <span v-if="!running">
            <v-btn color="success" @click="startSlot">Slot Start !!</v-btn>
          </span>
          <span v-else>
            <v-btn color="error" @click="stopSlot">Stop !!</v-btn>
          </span>
        </h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const numImage = 30;

export default {
  data: () => ({
    selectedImage: require(`@/assets/icon.png`),
    images: [],
    timeId: 0,
    running: false
  }),
  methods: {
    getImageData(n) {
      for (let i = 1; i < n + 1; i++) {
        this.images.push(require(`@/assets/slot_images/image_${i}.png`));
      }
    },
    startSlot() {
      var imageIdx = Math.floor(Math.random() * this.images.length);
      this.selectedImage = this.images[imageIdx];
      this.timeId = setTimeout(this.startSlot, 50);
      this.running = true;
    },
    stopSlot() {
      clearTimeout(this.timeId);
      this.running = false;
    }
  },
  mounted() {
    this.getImageData(numImage);
  }
};
</script>

<style></style>
