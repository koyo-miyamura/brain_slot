<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-layout justify-center>
          <div ref="cardCont" class="cardCont" contain @click="startSlot">
            <div
              ref="cardFront"
              class="my-3 cardFront"
              :style="{
                'background-image': 'url(' + frontImage + ')'
              }"
            ></div>
            <div
              ref="cardBack"
              class="my-3 cardBack"
              :style="{
                'background-image': 'url(' + selectedImage + ')'
              }"
            ></div>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { TweenMax, TimelineMax, CSSPlugin } from "gsap";
const numImage = 30;
CSSPlugin.defaultTransformPerspective = 1000;

export default {
  data: () => ({
    selectedImage: require(`@/assets/icon.png`),
    frontImage: require(`@/assets/card_back_yellow.png`),
    images: [],
    timeId: 0,
    reversed: true,
    tl: null
  }),
  methods: {
    getImageData(n) {
      for (let i = 1; i < n + 1; i++) {
        this.images.push(require(`@/assets/slot_images/image_${i}.png`));
      }
    },
    startSlot() {
      this.reversed ? this.tl.play() : this.tl.reverse();
      this.reversed = !this.reversed;
    }
  },
  mounted() {
    this.getImageData(numImage);
    let imageIdx = Math.floor(Math.random() * this.images.length);
    this.selectedImage = this.images[imageIdx];
    TweenMax.set(this.$refs.cardBack, { rotationY: -180 });
    this.tl = new TimelineMax({ paused: true });
    this.tl
      .to(this.$refs.cardFront, 1, { rotationY: 180 })
      .to(this.$refs.cardBack, 1, { rotationY: 0 }, 0)
      .to(this.$refs.cardCont, 0.5, { z: 50 }, 0)
      .to(this.$refs.cardCont, 0.5, { z: 0 }, 0.5);
  }
};
</script>

<style scoped>
.cardCont {
  height: 320px;
  min-width: 200px;
  padding-right: 100px;
  position: relative;
}
.cardFront,
.cardBack {
  /* 重ねて表示する用 */
  position: absolute;
  height: 320px;
  min-width: 200px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  border: solid 2px #444;
}
</style>
