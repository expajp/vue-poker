import AbstractYaku from './AbstractYaku.js'
import deepcopyArray from '../utils/deepcopyArray.js'
import getScore from '../utils/getScore.js'
import getDifferenceArrays from '../utils/getDifferenceArrays.js'

// FullHouseクラス
export class FullHouse extends AbstractYaku {
    constructor(hand){
        super(hand)

        const numbersArray = deepcopyArray(hand).map(card => card.number)
        const numbersSet = [...new Set(deepcopyArray(numbersArray))]
        const doubledNumbers = getDifferenceArrays(numbersArray, numbersSet)
        const doubledNumbersSet = [...new Set(deepcopyArray(doubledNumbers))]
        
        this.tripledNumber = getDifferenceArrays(doubledNumbers, doubledNumbersSet)[0]
    }

    // 役のランクを返す
    getYakuRank(){
        return 6
    }
    // 役の名前を返す
    getYakuName(){
        return 'FullHouse'
    }
    // 勝敗判定に使う数字を返す
    getScore(){
        return getScore(this.tripledNumber)
    }
}