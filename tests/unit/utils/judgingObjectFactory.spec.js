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