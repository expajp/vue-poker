import score from './score.js'
import compareCardsForAscendingRangeOfScore from './compareCardsForAscendingRangeOfScore.js'
import parseHand from './parseHand.js'

export default (playersHand) => {
    const parsedHand = parseHand(playersHand)
    return generateJudgingObject(parsedHand)
}

function generateJudgingObject(parsedHand){
    // TODO
}

function getScoreFromYaku(yaku){
    const rankForYaku = {
        'OnePair' : 1, 
        'TwoPair' : 2, 
        'ThreeCard' : 3, 
        'Straight' : 4, 
        'Flash' : 5, 
        'FullHouse' : 6, 
        'FourCard' : 7, 
        'StraightFlash' : 8, 
        'RoyalStraightFlash' : 9
    }
    const rankForSuit = {
        'none' : 0,
        'clover' : 1,    
        'diamond' : 2,    
        'heart' : 3,    
        'spade' : 4
    }
    const score = yaku.number.toString(16) + yaku.secondNumber.toString(16) + rankForSuit[yaku.suit]
    return { yaku: yaku.yaku, comparableStr: ('000'.repeat(8)+score+'000'.repeat(rankForYaku[yaku.yaku])).substr(-27) }
}

function getYaku(hand){
    const checkersResult = Object.assign(numbersCounter(hand), flashChecker(hand), straightChecker(hand))
    const sortedHand = deepcopyArray(hand).sort((a, b) => compareCardsForAscendingRangeOfScore(a, b))
    let ret = { 
        yaku: 'None', 
        number: score(sortedHand[sortedHand.length-1].number), 
        suit: sortedHand[sortedHand.length-1].suit,
        secondNumber: 0 
    }

    if(checkersResult.pairs === 1){
        ret.number = checkersResult.numbersScore
        ret.suit = checkersResult.numbersSuit
        ret.yaku = 'OnePair'
    }
    if(checkersResult.pairs === 2){
        ret.number = checkersResult.numbersScore
        ret.suit = checkersResult.numbersSuit
        ret.secondNumber = checkersResult.secondNumbersScore
        ret.yaku = 'TwoPair'
    } 
    if(checkersResult.threeCard){
        ret.number = checkersResult.numbersScore
        ret.suit = checkersResult.numbersSuit
        ret.yaku = 'ThreeCard'
    }
    if(checkersResult.straight) ret.yaku = 'Straight'
    if(checkersResult.flash){
        ret.suit = checkersResult.flashSuit
        ret.yaku = 'Flash'
    }
    if(checkersResult.pairs === 1 && checkersResult.threeCard) ret.yaku = 'FullHouse'
    if(checkersResult.fourCard) ret.yaku = 'FourCard'
    if(checkersResult.straight && checkersResult.flash){
        ret.suit = checkersResult.straightSuit
        ret.yaku = 'StraightFlash'
    }
    if(checkersResult.straight && checkersResult.flash && ret.number === 12){
        ret.suit = checkersResult.straightSuit
        ret.yaku = 'RoyalStraightFlash'
    }
    return ret
}