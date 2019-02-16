import AbstractYaku from './AbstractYaku.js'
import compareCardsForAscendingRangeOfScore from '../compareCardsForAscendingRangeOfScore.js';
import deepcopyArray from '../deepcopyArray.js'

// OnePairクラス
export default class extends AbstractYaku {
    constructor(hand){
        super(hand)
    }

    // 役のランクを返す
    getYakuRank(){
        return 1
    }
    // 役の名前を返す
    getYakuName(){
        return 'OnePair'
    }
    // 勝敗判定に使う数字を返す
    getScore(){
        if(this.number === undefined) {
            const sortedHand = deepcopyArray(this.hand).sort((a, b) => compareCardsForAscendingRangeOfScore)
            this.number = sortedHand[sortedHand.length-1].number
        }
        return this.number
    }
    // 勝敗判定に使う2つめの数字を返す
    // ツーペア以外では定義しない
    getSecondScore(){
        throw new Error('getSecondNumber()を定義してください')
    }
    // 勝敗判定に使うスートを返す
    getSuit(){
        throw new Error('getSuit()を定義してください')
    }
}