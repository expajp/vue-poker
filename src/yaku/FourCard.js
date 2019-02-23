import AbstractYaku from './AbstractYaku.js'
import deepcopyArray from '../utils/deepcopyArray.js'
import getScore from '../utils/getScore.js'
import getDifferenceArrays from '../utils/getDifferenceArrays.js'
import getUniqueArray from '../utils/getUniqueArray.js';

// FourCardクラス
export class FourCard extends AbstractYaku {
    constructor(hand){
        super(hand)

        const numbersArray = deepcopyArray(hand).map(card => card.number)
        const numbersSet = getUniqueArray(numbersArray)
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