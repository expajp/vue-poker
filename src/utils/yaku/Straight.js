import deepcopyArray from "../deepcopyArray";
import compareCardsForAscendingRangeOfScore from "../compareCardsForAscendingRangeOfScore";
import getScore from '../getScore.js'

// Straightクラス
export default class {
    constructor(hand){
        super(hand)
        const handSortedByScore = deepcopyArray(hand).sort((a, b) => compareCardsForAscendingRangeOfScore(a, b))
        this.maxScoredNumber = handSortedByScore[4].number
        this.maxScoredNumbersSuit = handSortedByScore[4].suit
    }

    // 役のランクを返す
    getYakuRank(){
        return 4
    }
    // 役の名前を返す
    getYakuName(){
        return 'Straight'
    }
    // 勝敗判定に使う数字を返す
    getScore(){
        return getScore(this.maxScoredNumber)
    }
    // 勝敗判定に使うスートを返す
    getSuit(){
        return this.maxScoredNumbersSuit
    }
}