import judgingObjectFactory from '@/utils/judgingObjectFactory'
import { FourCard, None, RoyalStraightFlash, StraightFlash, TwoPair, Flash, FullHouse, OnePair, Straight, ThreeCard } from '@/yaku'


describe('ロイヤルストレートフラッシュが正しく判別される', () =>{
    const hand = [
        { number: 10, suit: 'spade' },
        { number: 11, suit: 'spade' },
        { number: 12, suit: 'spade' },
        { number: 13, suit: 'spade' },
        { number:  1, suit: 'spade' }
    ]

    it('戻り値の生成元クラス名がRoyalStraightFlash', () => {
        expect(judgingObjectFactory(hand)).toBeInstanceOf(RoyalStraightFlash)
    })
})

describe('ストレートフラッシュが正しく判別される', () =>{
    const hand = [
        { number:  9, suit: 'spade' },
        { number: 10, suit: 'spade' },
        { number: 11, suit: 'spade' },
        { number: 12, suit: 'spade' },
        { number: 13, suit: 'spade' },
    ]

    it('戻り値の生成元クラス名がStraightFlash', () => {
        expect(judgingObjectFactory(hand)).toBeInstanceOf(StraightFlash)
    })
})

describe('フォーカードが正しく判別される', () =>{
    const hand = [
        { number:  1, suit: 'spade' },
        { number: 13, suit: 'club' },
        { number: 13, suit: 'diamond' },
        { number: 13, suit: 'heart' },
        { number: 13, suit: 'spade' },
    ]

    it('戻り値の生成元クラス名がFourCard', () => {
        expect(judgingObjectFactory(hand)).toBeInstanceOf(FourCard)
    })
})

describe('フルハウスが正しく判別される', () =>{
    const hand = [
        { number:  1, suit: 'spade' },
        { number:  1, suit: 'club' },
        { number: 13, suit: 'diamond' },
        { number: 13, suit: 'heart' },
        { number: 13, suit: 'spade' },
    ]

    it('戻り値の生成元クラス名がFullHouse', () => {
        expect(judgingObjectFactory(hand)).toBeInstanceOf(FullHouse)
    })
})

describe('フラッシュが正しく判別される', () =>{
    const hand = [
        { number:  2, suit: 'spade' },
        { number:  4, suit: 'spade' },
        { number:  6, suit: 'spade' },
        { number:  8, suit: 'spade' },
        { number: 10, suit: 'spade' },
    ]

    it('戻り値の生成元クラス名がFlash', () => {
        expect(judgingObjectFactory(hand)).toBeInstanceOf(Flash)
    })
})

describe('ストレートが正しく判別される', () =>{
    const hand = [
        { number:  2, suit: 'spade' },
        { number:  3, suit: 'spade' },
        { number:  4, suit: 'club' },
        { number:  5, suit: 'spade' },
        { number:  6, suit: 'spade' },
    ]

    it('戻り値の生成元クラス名がStraight', () => {
        expect(judgingObjectFactory(hand)).toBeInstanceOf(Straight)
    })
})

describe('スリーカードが正しく判別される', () =>{
    const hand = [
        { number:  1, suit: 'spade' },
        { number:  2, suit: 'club' },
        { number: 13, suit: 'diamond' },
        { number: 13, suit: 'heart' },
        { number: 13, suit: 'spade' },
    ]

    it('戻り値の生成元クラス名がThreeCard', () => {
        expect(judgingObjectFactory(hand)).toBeInstanceOf(ThreeCard)
    })
})

describe('ツーペアが正しく判別される', () =>{
    const hand = [
        { number:  1, suit: 'spade' },
        { number:  2, suit: 'club' },
        { number:  2, suit: 'diamond' },
        { number: 13, suit: 'heart' },
        { number: 13, suit: 'spade' },
    ]

    it('戻り値の生成元クラス名がTwoPair', () => {
        expect(judgingObjectFactory(hand)).toBeInstanceOf(TwoPair)
    })
})

describe('ワンペアが正しく判別される', () =>{
    const hand = [
        { number:  1, suit: 'spade' },
        { number:  2, suit: 'club' },
        { number:  3, suit: 'diamond' },
        { number: 13, suit: 'heart' },
        { number: 13, suit: 'spade' },
    ]

    it('戻り値の生成元クラス名がOnePair', () => {
        expect(judgingObjectFactory(hand)).toBeInstanceOf(OnePair)
    })
})

