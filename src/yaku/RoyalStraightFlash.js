import getScore from '../utils/getScore.js'
import AbstractYaku from './AbstractYaku.js';

// RoyalStraightFlashクラス
export class RoyalStraightFlash extends AbstractYaku {
    constructor(hand){
        super(hand)
        this.suit = this.hand[0].suit
    }

    // 役のランクを返す
    getYakuRank(){
        return 9
    }
    // 役の名前を返す
    getYakuName(){
        return 'RoyalStraightFlash'
    }
    // 勝敗判定に使う数字を返す
    getScore(){
        return getScore(1)
    }
    // 勝敗判定に使うスートを返す
    getSuit(){
        return this.suit
    }
}