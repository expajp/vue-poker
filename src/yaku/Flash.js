import deepcopyArray from "../utils/deepcopyArray";
import compareCardsByScoreAsc from "../utils/compareCardsByScoreAsc";
import getScore from '../utils/getScore.js'
import AbstractYaku from "./AbstractYaku";

// Flashクラス
export class Flash extends AbstractYaku {
    constructor(hand){
        super(hand)
        const handSortedByScore = deepcopyArray(this.hand).sort(compareCardsByScoreAsc)
        this.maxScoredNumber = handSortedByScore[4].number
        this.suit = handSortedByScore[4].suit
    }

    // 役のランクを返す
    getYakuRank(){
        return 5
    }
    // 役の名前を返す
    getYakuName(){
        return 'Flash'
    }
    // 勝敗判定に使う数字を返す
    getScore(){
        return getScore(this.maxScoredNumber)
    }
    // 勝敗判定に使うスートを返す
    getSuit(){
        return this.suit
    }
}