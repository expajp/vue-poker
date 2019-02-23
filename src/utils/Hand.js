import getScore from './getScore.js'
import compareCardsForAscendingRangeOfScore from './compareCardsForAscendingRangeOfScore.js'
import deepcopyArray from './deepcopyArray.js'
import getDifferenceArrays from './getDifferenceArrays.js'

export class Hand {
    constructor(arr){
        // 手札に含まれるカード
        this.cards = arr
        
        this.numbersArray = deepcopyArray(this.card).map(card => card.number)
        const numbersSet = [...new Set(deepcopyArray(this.numbersArray))]

        // 重複している数字のみ、かつ多重度が1つ減ったもの
        this.doubledNumbers = getDifferenceArrays(this.numbersArray, numbersSet)

        // 重複している数字
        this.doubledNumbersSet = [...new Set(deepcopyArray(this.doubledNumbers))]
    }

    getMaxScore(){
        return deepcopyArray(this.numbersArray).map(number => getScore(number)).sort()[4]
    }

    isFlash(){
        return [...new Set(this.cards.map(card => card.suit))].length === 1
    }

    isStraight(){
        const sortedHand = deepcopyArray(this.cards).sort((a, b) => compareCardsForAscendingRangeOfScore(a, b))
        const scoreDiff = Math.abs(getScore(sortedHand[4].number)-getScore(sortedHand[0].number))
        const numbers = [...new Set(deepcopyArray(sortedHand).map(card => card.number))]

        return scoreDiff === 4 && numbers.length === 5
    }

    hasNone(){
        return this.doubledNumbers.length === 0
    }

    hasOnePair(){
        return this.doubledNumbersSet.length === 1 && this.doubledNumbers.length === 1
    }

    hasTwoPair(){
        return this.doubledNumbersSet.length === 2 && this.doubledNumbers.length === 2
    }
    
    hasThreeCard(){
        return this.doubledNumbersSet.length === 1 && this.doubledNumbers.length === 2
    }
    
    isFullHouse(){
        return this.doubledNumbersSet.length === 2 && this.doubledNumbers.length === 3
    }

    hasFourCard(){
        return this.doubledNumbersSet.length === 1 && this.doubledNumbers.length === 3
    }
}
