import { mount } from "@vue/test-utils";
import Player from "@/components/Player.vue";

describe("正しく描画される", () => {
    const player = mount(Player)

    it("正しく描画される", () => {
        expect(player.find(".player").exists()).toBe(true)
    })
    it("カードが5枚描画される", () => {
        expect(player.findAll(".card").length).toBe(5)
    })
    it("ボタンが2個描画される", () => {
        expect(player.findAll("button").length).toBe(2)
    })
})

describe("selectedが正しく抽出される", () => {
    const hand = [
        { number: 10, suit: 'spade', selected: false, hide: false },
        { number: 11, suit: 'spade', selected: true,  hide: false },
        { number: 12, suit: 'spade', selected: false, hide: false },
        { number: 13, suit: 'spade', selected: false, hide: false },
        { number:  1, suit: 'spade', selected: true,  hide: false }
    ]

    it("selectedがカードを2枚返す", () => {
        expect(Player.computed.selected.call({ hand: hand }).length).toBe(2)
    })
})

describe("カードをselectedにする", () => {
    const player = mount(Player)
    const card = player.find(".card:first-child")

    it("カードを選択するとクラスが付与される", () => {
        card.trigger("click")
        expect(card.html()).toContain('class="card selected"')
    })
})
