import { shallowMount } from "@vue/test-utils";
import Card from "@/components/Card.vue";

describe("正しく描画される", () => {
  const card = shallowMount(Card, {
    propsData: {
      number: 10,
      suit: "spade",
      selected: false,
      hide: false
    }
  });

  it("正しくHTML化される", () => {
    expect(card.find(".card").exists()).toBe(true);
  });
});
