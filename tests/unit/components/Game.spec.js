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
    
    it("showButtonsがfalseだとjudgeVictoryOrDefeatの結果を返す", () => {

    })
})

describe("勝敗を判定する", () => {
    it("両者Noneならば引き分け", () => {
        
    })
    
    it("役が異なるならば強いほうが勝利", () => {
        
    })

    it("役が同じならば、数字を比較して大きいほうが勝利", () => {

    })

    it("ツーペアどうして大きい方の数字が同じならば、もう一つの数字が大きい方が勝利", () => {

    })

    it("ツーペアどうしで両方数字が同じならば、大きい方の数字でスートの強い方が勝利", () => {

    })
    
    it("全く同じ内容ならば、エラーを投げる", () => {

    })
    
})