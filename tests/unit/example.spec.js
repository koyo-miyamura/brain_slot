import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import SlotContent from "@/components/SlotContent.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(SlotContent, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  });
});
