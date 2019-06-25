import { mount } from "@vue/test-utils";
import Dealer from "@/components/Dealer.vue";
import AbstractYaku from "@/yaku/AbstractYaku";

describe("正しく描画される", () => {
  const dealer = mount(Dealer);

  it("正しく描画される", () => {
    expect(dealer.find(".dealer").exists()).toBe(true);
  });
  it("カードが5枚描画される", () => {
    expect(dealer.findAll(".card").length).toBe(5);
  });
});

describe("postexecイベントが起こる", () => {
  const hand = [
    { number: 10, suit: "spade", hide: true },
    { number: 11, suit: "spade", hide: true },
    { number: 12, suit: "spade", hide: true },
    { number: 13, suit: "spade", hide: true },
    { number: 1, suit: "spade", hide: true }
  ];
  const dealer = mount(Dealer);

  dealer.setData({ hand: hand });
  dealer.vm.postexec();

  it("resultにAbstractYakuのインスタンスがセットされる", () => {
    expect(dealer.vm.result).toBeInstanceOf(AbstractYaku);
  });

  it("カードがすべてhide: falseになる", () => {
    const hides = dealer.vm.hand.map(card => {
      return card.hide;
    });
    expect(
      hides.every(hide => {
        return !hide;
      })
    ).toBe(true);
  });

  it("親コンポーネントのresultが発火する", () => {
    expect(dealer.emitted().result[0].length).toBe(1);
  });
});
