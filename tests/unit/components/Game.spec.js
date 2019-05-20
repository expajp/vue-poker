import { mount } from "@vue/test-utils"
import Game from "@/components/Game.vue"
import Hand from "@/utils/Hand"
import { FourCard, None, RoyalStraightFlash, StraightFlash, TwoPair, Flash, FullHouse, OnePair, Straight, ThreeCard } from '@/yaku'

describe("正しく描画される", () => {
    const game = mount(Game)

    it("メッセージが表示される", () => {
        expect(game.findAll(".message").at(0).html()).toContain("Welcome to Poker")
    })
})

describe("resultMessageが正しく動作する", () => {
    const game = mount(Game)

    it("showButtonsがtrueのときは空文字列", () => {
        game.setData({ showButtons: true })
        expect(game.vm.resultMessage).toBe('')
    })
    
    it("showButtonsがfalseだとjudgeVictoryOrDefeatの結果を返す", () => {

    })
})

describe.only("勝敗を判定する", () => {
    it("両者Noneならば引き分け", () => {
        const game = mount(Game)
        const playersHand = [
            { number:  7, suit: 'spade' },
            { number:  9, suit: 'diamond' },
            { number: 11, suit: 'clover' },
            { number: 13, suit: 'heart' },
            { number:  1, suit: 'spade' }
        ]
        const dealersHand = [
            { number:  6, suit: 'spade' },
            { number:  8, suit: 'diamond' },
            { number: 10, suit: 'clover' },
            { number: 12, suit: 'heart' },
            { number:  1, suit: 'spade' }
        ]
        
        expect(game.vm.judgeVictoryOrDefeat(new None(playersHand), new None(dealersHand))).toBe('Draw')
    })
    
    it("役が異なるならば強いほうが勝利", () => {
        const game = mount(Game)
        const playersHand = new Hand([
            { number:  7, suit: 'spade' },
            { number:  8, suit: 'spade' },
            { number:  9, suit: 'spade' },
            { number: 10, suit: 'spade' },
            { number: 11, suit: 'spade' }
        ])
        const dealersHand = new Hand([
            { number: 10, suit: 'spade' },
            { number: 11, suit: 'spade' },
            { number: 12, suit: 'spade' },
            { number: 13, suit: 'spade' },
            { number:  1, suit: 'spade' }
        ])
        
        expect(game.vm.judgeVictoryOrDefeat(new StraightFlash(playersHand), new RoyalStraightFlash(dealersHand))).toBe('You Lose')
    })
    
    it("ストレートフラッシュどうしで数字を比較して大きいほうが勝利", () => {
        const game = mount(Game)
        const playersHand = new Hand([
            { number:  9, suit: 'spade' },
            { number: 10, suit: 'spade' },
            { number: 11, suit: 'spade' },
            { number: 12, suit: 'spade' },
            { number: 13, suit: 'spade' }
        ])
        const dealersHand = new Hand([
            { number:  8, suit: 'spade' },
            { number:  9, suit: 'spade' },
            { number: 10, suit: 'spade' },
            { number: 11, suit: 'spade' },
            { number: 12, suit: 'spade' }
        ])

        expect(game.vm.judgeVictoryOrDefeat(new StraightFlash(playersHand), new StraightFlash(dealersHand))).toBe('You Win')
    })

    it("ツーペアどうして大きい方の数字が同じならば、もう一つの数字が大きい方が勝利", () => {

    })

    it("ツーペアどうしで両方数字が同じならば、大きい方の数字でスートの強い方が勝利", () => {

    })
    
    it("全く同じ内容ならば、エラーを投げる", () => {

    })
    
})