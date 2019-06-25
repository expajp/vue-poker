import { mount } from "@vue/test-utils";
import Player from "@/components/Player.vue";
import AbstractYaku from "@/yaku/AbstractYaku";

describe("正しく描画される", () => {
  const player = mount(Player);

  it("正しく描画される", () => {
    expect(player.find(".player").exists()).toBe(true);
  });
  it("カードが5枚描画される", () => {
    expect(player.findAll(".card").length).toBe(5);
  });
  it("ボタンが2個描画される", () => {
    expect(player.findAll("button").length).toBe(2);
  });
});

describe("selectedが正しく抽出される", () => {
  const hand = [
    { number: 10, suit: "spade", selected: false, hide: false },
    { number: 11, suit: "spade", selected: true, hide: false },
    { number: 12, suit: "spade", selected: false, hide: false },
    { number: 13, suit: "spade", selected: false, hide: false },
    { number: 1, suit: "spade", selected: true, hide: false }
  ];

  it("selectedがカードを2枚返す", () => {
    expect(Player.computed.selected.call({ hand: hand }).length).toBe(2);
  });
});

describe("カードをselectedにする", () => {
  const player = mount(Player);
  const card = player.find(".card:first-child");

  it("カードを選択するとクラスが付与される", () => {
    card.trigger("click");
    expect(card.html()).toContain('class="card selected"');
  });
});

describe("changeボタンを押す", () => {
  const hand = [
    { number: 10, suit: "spade", selected: false, hide: false },
    { number: 11, suit: "spade", selected: true, hide: false },
    { number: 12, suit: "spade", selected: false, hide: false },
    { number: 13, suit: "spade", selected: false, hide: false },
    { number: 1, suit: "spade", selected: true, hide: false }
  ];
  const player = mount(Player, { propsData: { showButtons: true } });
  player.setData({ hand: hand });
  player.find("button:first-child").trigger("click");

  it("changedがtrueになる", () => {
    expect(player.vm.changed).toBe(true);
  });
  it("stand()が実行されてresultがオブジェクトになる", () => {
    expect(player.vm.result).toBeInstanceOf(AbstractYaku);
  });
  it("stand()が実行されてselectedが空になる", () => {
    expect(player.vm.selected.length).toBe(0);
  });
  it("stand()が実行されて親コンポーネントのstandが発火する", () => {
    expect(player.emitted().stand[0].length).toBe(1);
  });
});
