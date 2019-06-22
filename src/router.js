import Vue from "vue";
import Router from "vue-router";
import SlotContent from "./views/Slot.vue";
import CardContent from "./views/Card.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "slot",
      component: SlotContent
    },
    {
      path: "/card",
      name: "card",
      component: CardContent
    }
  ]
});
