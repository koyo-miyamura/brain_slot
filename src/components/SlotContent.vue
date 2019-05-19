<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-img :src="resultImg" class="my-3" contain height="400"></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="font-weight-bold">
          <v-btn color="success">Slot Start !!</v-btn>
        </h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    resultImg: require(`@/assets/icon.png`),
    resultImgs: []
  }),
  mounted() {
    for (let i = 1; i < 11; i++) {
      this.resultImgs.push(require(`@/assets/slot_images/image_${i}.png`));
    }
  }
};
</script>

<style></style>
