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
