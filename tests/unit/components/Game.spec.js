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

describe("勝敗を判定する", () => {
    const game = mount(Game)

    it("両者Noneならば引き分け", () => {
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
    
    it("ストレートフラッシュどうしで数字を比較して強いほうが勝利", () => {
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
    
    it("フォーカードどうしで数字を比較して強いほうが勝利", () => {
        const playersHand = new Hand([
            { number: 13, suit: 'spade' },
            { number: 13, suit: 'heart' },
            { number: 13, suit: 'diamond' },
            { number: 13, suit: 'club' },
            { number: 11, suit: 'heart' }
        ])
        const dealersHand = new Hand([
            { number:  1, suit: 'spade' },
            { number:  1, suit: 'heart' },
            { number:  1, suit: 'diamond' },
            { number:  1, suit: 'club' },
            { number: 12, suit: 'heart' }
        ])

        expect(game.vm.judgeVictoryOrDefeat(new FourCard(playersHand), new FourCard(dealersHand))).toBe('You Lose')
    })
    
    it("フルハウスどうしで3枚組の数字を比較して強いほうが勝利", () => {
        const playersHand = new Hand([
            { number:  1, suit: 'spade' },
            { number:  1, suit: 'heart' },
            { number:  1, suit: 'diamond' },
            { number: 11, suit: 'club' },
            { number: 11, suit: 'heart' }
        ])
        const dealersHand = new Hand([
            { number: 13, suit: 'spade' },
            { number: 13, suit: 'heart' },
            { number: 13, suit: 'diamond' },
            { number: 12, suit: 'club' },
            { number: 12, suit: 'heart' }
        ])

        expect(game.vm.judgeVictoryOrDefeat(new FullHouse(playersHand), new FullHouse(dealersHand))).toBe('You Win')
    })
    
    it("フラッシュどうしで数字を比較して強いほうが勝利", () => {
        const playersHand = new Hand([
            { number:  1, suit: 'club' },
            { number:  2, suit: 'club' },
            { number:  3, suit: 'club' },
            { number:  4, suit: 'club' },
            { number:  5, suit: 'club' }
        ])
        const dealersHand = new Hand([
            { number:  7, suit: 'spade' },
            { number:  8, suit: 'spade' },
            { number:  9, suit: 'spade' },
            { number: 11, suit: 'spade' },
            { number: 13, suit: 'spade' }
        ])

        expect(game.vm.judgeVictoryOrDefeat(new Flash(playersHand), new Flash(dealersHand))).toBe('You Win')
    })

    it("フラッシュどうしで数字が同じならばスートを比較して強いほうが勝利", () => {
        const playersHand = new Hand([
            { number:  1, suit: 'club' },
            { number:  2, suit: 'club' },
            { number:  3, suit: 'club' },
            { number:  4, suit: 'club' },
            { number:  5, suit: 'club' }
        ])
        const dealersHand = new Hand([
            { number:  1, suit: 'spade' },
            { number:  2, suit: 'spade' },
            { number:  3, suit: 'spade' },
            { number:  4, suit: 'spade' },
            { number:  5, suit: 'spade' }
        ])

        expect(game.vm.judgeVictoryOrDefeat(new Flash(playersHand), new Flash(dealersHand))).toBe('You Lose')
    })
    
    it("ストレートどうしで数字を比較して強いほうが勝利", () => {
        const playersHand = new Hand([
            { number:  9, suit: 'club' },
            { number: 10, suit: 'diamond' },
            { number: 11, suit: 'club' },
            { number: 12, suit: 'club' },
            { number: 13, suit: 'club' }
        ])
        const dealersHand = new Hand([
            { number:  8, suit: 'spade' },
            { number:  9, suit: 'spade' },
            { number: 10, suit: 'spade' },
            { number: 11, suit: 'spade' },
            { number: 12, suit: 'diamond' }
        ])

        expect(game.vm.judgeVictoryOrDefeat(new Straight(playersHand), new Straight(dealersHand))).toBe('You Win')
    })
    
    it("ストレートどうしで数字が同じならば最大数のスートを比較して強いほうが勝利", () => {
        const playersHand = new Hand([
            { number:  9, suit: 'club' },
            { number: 10, suit: 'diamond' },
            { number: 11, suit: 'club' },
            { number: 12, suit: 'club' },
            { number: 13, suit: 'club' }
        ])
        const dealersHand = new Hand([
            { number:  9, suit: 'spade' },
            { number: 10, suit: 'heart' },
            { number: 11, suit: 'spade' },
            { number: 12, suit: 'spade' },
            { number: 13, suit: 'spade' }
        ])

        expect(game.vm.judgeVictoryOrDefeat(new Straight(playersHand), new Straight(dealersHand))).toBe('You Lose')
    })
    
    it("ストレートどうしで数字が同じならば最大数のスートを比較して強いほうが勝利", () => {
        const playersHand = new Hand([
            { number:  9, suit: 'club' },
            { number: 10, suit: 'diamond' },
            { number: 11, suit: 'club' },
            { number: 12, suit: 'club' },
            { number: 13, suit: 'club' }
        ])
        const dealersHand = new Hand([
            { number:  9, suit: 'spade' },
            { number: 10, suit: 'heart' },
            { number: 11, suit: 'spade' },
            { number: 12, suit: 'spade' },
            { number: 13, suit: 'spade' }
        ])

        expect(game.vm.judgeVictoryOrDefeat(new Straight(playersHand), new Straight(dealersHand))).toBe('You Lose')
    })

    it("スリーカードどうしならば数を比較して強いほうが勝利", () => {
        const playersHand = new Hand([
            { number:  1, suit: 'club' },
            { number:  1, suit: 'diamond' },
            { number:  1, suit: 'spade' },
            { number:  2, suit: 'club' },
            { number:  3, suit: 'club' }
        ])
        const dealersHand = new Hand([
            { number: 11, suit: 'spade' },
            { number: 12, suit: 'heart' },
            { number: 13, suit: 'spade' },
            { number: 13, suit: 'club' },
            { number: 13, suit: 'diamond' }
        ])

        expect(game.vm.judgeVictoryOrDefeat(new ThreeCard(playersHand), new ThreeCard(dealersHand))).toBe('You Win')
    })
        
    it("ツーペアどうしで強い方の数が同じならば弱い方を比較してより強いほうが勝利", () => {
        const playersHand = new Hand([
            { number:  1, suit: 'club' },
            { number:  1, suit: 'diamond' },
            { number:  2, suit: 'spade' },
            { number:  2, suit: 'club' },
            { number:  3, suit: 'club' }
        ])
        const dealersHand = new Hand([
            { number:  1, suit: 'spade' },
            { number:  1, suit: 'heart' },
            { number: 12, suit: 'heart' },
            { number: 12, suit: 'spade' },
            { number: 11, suit: 'spade' }
        ])

        expect(game.vm.judgeVictoryOrDefeat(new TwoPair(playersHand), new TwoPair(dealersHand))).toBe('You Lose')
    })
    
    it("ツーペアどうしで数が全く同じならば、強い方の数でスペードを持っているほうが勝利", () => {
        const playersHand = new Hand([
            { number:  1, suit: 'club' },
            { number:  1, suit: 'diamond' },
            { number:  2, suit: 'spade' },
            { number:  2, suit: 'club' },
            { number:  3, suit: 'club' }
        ])
        const dealersHand = new Hand([
            { number:  1, suit: 'spade' },
            { number:  1, suit: 'heart' },
            { number:  2, suit: 'heart' },
            { number:  2, suit: 'diamond' },
            { number: 11, suit: 'spade' }
        ])

        expect(game.vm.judgeVictoryOrDefeat(new TwoPair(playersHand), new TwoPair(dealersHand))).toBe('You Lose')
    })
    
    it("ツーペアどうしならば強い方の数を比較してより強いほうが勝利", () => {
        const playersHand = new Hand([
            { number:  1, suit: 'club' },
            { number:  1, suit: 'diamond' },
            { number:  2, suit: 'spade' },
            { number:  2, suit: 'club' },
            { number:  3, suit: 'club' }
        ])
        const dealersHand = new Hand([
            { number: 11, suit: 'spade' },
            { number: 12, suit: 'heart' },
            { number: 12, suit: 'spade' },
            { number: 13, suit: 'club' },
            { number: 13, suit: 'diamond' }
        ])
    
        expect(game.vm.judgeVictoryOrDefeat(new TwoPair(playersHand), new TwoPair(dealersHand))).toBe('You Win')
    })

    it("ワンペアどうしならば、ペアの数字が強いほうが勝利", () => {
        const playersHand = new Hand([
            { number:  1, suit: 'club' },
            { number:  1, suit: 'diamond' },
            { number:  2, suit: 'spade' },
            { number:  3, suit: 'club' },
            { number:  4, suit: 'club' }
        ])
        const dealersHand = new Hand([
            { number: 13, suit: 'spade' },
            { number: 13, suit: 'heart' },
            { number: 12, suit: 'heart' },
            { number: 11, suit: 'diamond' },
            { number: 10, suit: 'spade' }
        ])

        expect(game.vm.judgeVictoryOrDefeat(new OnePair(playersHand), new OnePair(dealersHand))).toBe('You Win')
    })
    
    it("ワンペアどうしで数が全く同じならば、大きい方の数でスペードを持っているほうが勝利", () => {
        const playersHand = new Hand([
            { number:  1, suit: 'club' },
            { number:  1, suit: 'diamond' },
            { number: 13, suit: 'spade' },
            { number: 12, suit: 'club' },
            { number: 11, suit: 'club' }
        ])
        const dealersHand = new Hand([
            { number:  1, suit: 'spade' },
            { number:  1, suit: 'heart' },
            { number: 13, suit: 'heart' },
            { number: 12, suit: 'diamond' },
            { number: 11, suit: 'spade' }
        ])

        expect(game.vm.judgeVictoryOrDefeat(new OnePair(playersHand), new OnePair(dealersHand))).toBe('You Lose')
    })

    it("全く同じ内容ならば、エラーを投げる", () => {
        const playersHand = new Hand([
            { number:  1, suit: 'spade' },
            { number: 10, suit: 'spade' },
            { number: 11, suit: 'spade' },
            { number: 12, suit: 'spade' },
            { number: 13, suit: 'spade' }
        ])
        const dealersHand = new Hand([
            { number:  1, suit: 'spade' },
            { number: 10, suit: 'spade' },
            { number: 11, suit: 'spade' },
            { number: 12, suit: 'spade' },
            { number: 13, suit: 'spade' }
        ])
    
        expect(() => {
            game.vm.judgeVictoryOrDefeat(new RoyalStraightFlash(playersHand), new RoyalStraightFlash(dealersHand)) 
        }).toThrowError('勝敗が判定できません')
    })
})
