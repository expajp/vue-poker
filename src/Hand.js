import getScore from './utils/getScore.js'
import cmpCardsByScoreAsc from './utils/cmpCardsByScoreAsc.js'
import deepcopyArray from './utils/deepcopyArray.js'
import getDifferenceArrays from './utils/getDifferenceArrays.js'
import getUniqueArray from './utils/getUniqueArray.js';

export class Hand {
    constructor(arr){
        // 手札に含まれるカード
        this.cards = arr
        
        this.numbersArray = deepcopyArray(this.cards).map(card => card.number)
        const numbersSet = getUniqueArray(this.numbersArray)

        // 重複している数字のみ、かつ多重度が1つ減ったもの
        this.doubledNumbers = getDifferenceArrays(this.numbersArray, numbersSet)

        // 重複している数字
        this.doubledNumbersSet = getUniqueArray(this.doubledNumbers)
    }

    getMaxScore(){
        return deepcopyArray(this.numbersArray).map(number => getScore(number)).sort()[4]
    }

    isFlash(){
        return getUniqueArray(this.cards.map(card => card.suit)).length === 1
    }

    isStraight(){
        const sortedHand = deepcopyArray(this.cards).sort((a, b) => cmpCardsByScoreAsc(a, b))
        const scoreDiff = Math.abs(getScore(sortedHand[4].number)-getScore(sortedHand[0].number))
        const numbers = getUniqueArray(deepcopyArray(sortedHand).map(card => card.number))

        return scoreDiff === 4 && numbers.length === 5
    }

    hasNone(){
        return this.doubledNumbers.length === 0
    }

    isOnePair(){
        return this.doubledNumbersSet.length === 1 && this.doubledNumbers.length === 1
    }

    isTwoPair(){
        return this.doubledNumbersSet.length === 2 && this.doubledNumbers.length === 2
    }
    
    isThreeCard(){
        return this.doubledNumbersSet.length === 1 && this.doubledNumbers.length === 2
    }
    
    isFullHouse(){
        return this.doubledNumbersSet.length === 2 && this.doubledNumbers.length === 3
    }

    isFourCard(){
        return this.doubledNumbersSet.length === 1 && this.doubledNumbers.length === 3
    }
}
