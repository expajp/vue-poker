import { mount } from "@vue/test-utils"
import Game from "@/components/Game.vue"

describe("正しく描画される", () => {
    const game = mount(Game)

    it("メッセージが表示される", () => {
        expect(game.findAll(".message").at(0).html()).toContain("Welcome to Poker")
    })
})

describe.only("resultMessageが正しく動作する", () => {
    const game = mount(Game)

    it("showButtonsがtrueのときは空文字列", () => {
        game.setData({ showButtons: true })
        expect(game.vm.resultMessage).toBe('')
    })
    
})