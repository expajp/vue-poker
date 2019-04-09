import getScore from './getScore.js'
import cmpCardsByScoreAsc from './cmpCardsByScoreAsc.js'
import deepcopyArray from './deepcopyArray.js'
import getDifferenceArrays from './getDifferenceArrays.js'
import getUniqueArray from './getUniqueArray.js'
import { FourCard, None, RoyalStraightFlash, StraightFlash, TwoPair, Flash, FullHouse, OnePair, Straight, ThreeCard } from '../yaku'

export default (playersHand) => {
    const hand = new Hand(playersHand)
    return generateJudgingObject(hand)
}

function generateJudgingObject(hand){    
    if(hand.isFlash()){
        if(hand.isStraight()){
            console.log(hand.getMaxScore())
            if(hand.getMaxScore() === 12) return new RoyalStraightFlash(hand)
            else return new StraightFlash(hand)
        } else {
            return new Flash(hand)
        }        
    } 
    if(hand.isFourCard()) return new FourCard(hand)
    if(hand.isFullHouse()) return new FullHouse(hand)
    if(hand.isStraight()) return new Straight(hand)
    if(hand.isThreeCard()) return new ThreeCard(hand)
    if(hand.isTwoPair()) return new TwoPair(hand)
    if(hand.isOnePair()) return new OnePair(hand)
    if(hand.hasNone()) return new None(hand)
}

class Hand {
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
        return Math.max(...deepcopyArray(this.numbersArray).map(number => getScore(number)))
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