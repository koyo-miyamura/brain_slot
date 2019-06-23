<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-layout justify-center>
          <div ref="cardCont" class="cardCont" contain>
            <div
              v-show="shuffled"
              ref="cardFront"
              class="cardFront"
              @click="flipCard"
            >
              <v-img :src="frontImage" contain></v-img>
            </div>
            <div
              v-show="shuffled"
              ref="cardBack"
              class="cardBack"
              @click="flipCard"
            >
              <v-img :src="selectedImage" contain></v-img>
            </div>
            <div
              v-for="i in numDummyCards"
              :key="i"
              v-show="!shuffled"
              class="cardDummy"
              :class="refCardDummy(i)"
              @click="shuffleCard"
            >
              <v-img :src="frontImage" contain></v-img>
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
    numDummyCards: 30,
    reversed: true,
    shuffled: false,
    tlFrip: null,
    tlShuffle: null
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
      this.reversed ? this.tlFrip.play() : this.tlFrip.reverse();
    },
    changeReversedStatus() {
      this.reversed = !this.reversed;
    },
    shuffleCard() {
      this.tlShuffle.play();
    },
    destroyDummy() {
      this.shuffled = true;
    },
    refCardDummy(i) {
      return `cardDummyPosition${i}`;
    }
  },
  mounted() {
    this.getImageData(numImage);

    TweenMax.set(this.$refs.cardBack, { rotationY: -180 });
    this.tlFrip = new TimelineMax({
      onStart: this.changeReversedStatus,
      onReverseComplete: this.changeReversedStatus,
      paused: true
    });
    this.tlFrip
      .to(this.$refs.cardFront, 0.75, { rotationY: 180 }, 0)
      .to(this.$refs.cardBack, 0.75, { rotationY: 0 }, 0)
      .to(this.$refs.cardCont, 0.375, { z: 50 }, 0)
      .to(this.$refs.cardCont, 0.375, { z: 0 }, 0.375)
      .call(this.selectImage, null, null, 0.1); // 第4引数 の position は 0.1 くらいにしないとチラつく

    for (let i = 1; i <= this.numDummyCards; i++) {
      let dummyHeight = Math.floor(Math.random() * 1000);
      let dummyLeft = Math.floor(Math.random() * 1000 - 500); // -500 ~ 500
      TweenMax.set(`.cardDummyPosition${i}`, {
        top: `${dummyHeight}px`,
        left: `${dummyLeft}px`
      });
    }
    this.tlShuffle = new TimelineMax({
      paused: true,
      onComplete: this.destroyDummy
    });
    this.tlShuffle.to(".cardDummy", 1, { top: 0, left: 0 });
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
.cardBack,
.cardDummy {
  position: absolute; /* 重ねて表示する用 */
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
