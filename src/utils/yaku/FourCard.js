import AbstractYaku from './AbstractYaku.js'
import deepcopyArray from '../deepcopyArray.js'
import getScore from '../getScore.js'
import getDifferenceArrays from '../getDifferenceArrays.js'

// FourCardクラス
export default class extends AbstractYaku {
    constructor(hand){
        super(hand)

        const numbersArray = deepcopyArray(hand).map(card => card.number)
        const numbersSet = [...new Set(deepcopyArray(numbersArray))]
        this.quadrupledNumber = getDifferenceArrays(numbersArray, numbersSet)[0]
    }

    // 役のランクを返す
    getYakuRank(){
        return 7
    }
    // 役の名前を返す
    getYakuName(){
        return 'FourCard'
    }
    // 勝敗判定に使う数字を返す
    getScore(){
        return getScore(this.quadrupledNumber)
    }
}