import { mount } from "@vue/test-utils"
import Dealer from "@/components/Dealer.vue"

describe("正しく描画される", () => {
    const dealer = mount(Dealer)

    it("正しく描画される", () => {
        expect(dealer.find(".dealer").exists()).toBe(true)
    })
    it("カードが5枚描画される", () => {
        expect(dealer.findAll(".card").length).toBe(5)
    })

})
