<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-layout justify-center>
          <div ref="cardCont" class="cardCont" contain @click="flipCard">
            <div ref="cardFront" class="my-3 cardFront">
              <v-img :src="frontImage" contain></v-img>
            </div>
            <div ref="cardBack" class="my-3 cardBack">
              <v-img :src="selectedImage" contain></v-img>
            </div>
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
    selectedImage: "",
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
    selectImage() {
      let imageIdx = Math.floor(Math.random() * this.images.length);
      this.selectedImage = this.images[imageIdx];
    },
    flipCard() {
      this.reversed ? this.tl.play() : this.tl.reverse();
    },
    changeReversedStatus() {
      this.reversed = !this.reversed;
    }
  },
  mounted() {
    this.getImageData(numImage);
    TweenMax.set(this.$refs.cardBack, { rotationY: -180 });
    this.tl = new TimelineMax({
      onStartComplete: this.changeReversedStatus,
      onReverseComplete: this.changeReversedStatus,
      paused: true
    });
    this.tl
      .to(this.$refs.cardFront, 0.75, { rotationY: 180 }, 0)
      .to(this.$refs.cardBack, 0.75, { rotationY: 0 }, 0)
      .to(this.$refs.cardCont, 0.375, { z: 50 }, 0)
      .to(this.$refs.cardCont, 0.375, { z: 0 }, 0.375)
      .call(this.selectImage, null, null, 0.1);
  }
};
</script>

<style scoped>
.cardCont {
  height: 320px;
  min-width: 230px;
  padding-right: 100px;
  position: relative;
}
.cardFront,
.cardBack {
  /* 重ねて表示する用 */
  position: absolute;
  height: 320px;
  min-width: 230px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
}
.cardBack {
  border: solid 2px #444;
  padding: 5px;
}
</style>
