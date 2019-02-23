import AbstractYaku from './AbstractYaku.js'
import deepcopyArray from '../deepcopyArray.js'
import getScore from '../getScore.js'
import getDifferenceArrays from '../getDifferenceArrays.js'
import compareCardsForAscendingRangeOfScore from './compareCardsForAscendingRangeOfScore.js'

// TwoPairクラス
export class TwoPair extends AbstractYaku {
    constructor(hand){
        super(hand)

        const numbersArray = deepcopyArray(hand).map(card => card.number)
        const numbersSet = [...new Set(deepcopyArray(numbersArray))]

        const doubledNumbers = getDifferenceArrays(numbersArray, numbersSet)
        const twoPairedNumbers = doubledNumbers.sort((a, b) => compareCardsForAscendingRangeOfScore(a, b))

        this.maxPairedNumber = twoPairedNumbers[1]
        this.secondPairedNumbers = twoPairedNumbers[0]
        this.suit = deepcopyArray(hand)
                        .filter(card => card.number === twoPairedNumbers[1] )
                        .sort()[1]
                        .suit
    }

    // 役のランクを返す
    getYakuRank(){
        return 2
    }
    // 役の名前を返す
    getYakuName(){
        return 'TwoPair'
    }
    // 勝敗判定に使う数字を返す
    getScore(){
        return getScore(this.maxPairedNumber)
    }
    // 勝敗判定に使う2つめの数字を返す
    getSecondScore(){
        return getScore(this.secondPairedNumbers)
    }
    // 勝敗判定に使うスートを返す
    getSuit(){
        return this.suit
    }
}