import score from './score.js'
import compareCardsForAscendingRangeOfScore from './compareCardsForAscendingRangeOfScore.js'

export default (playersHand) => {
    const yaku = getYaku(playersHand)
    console.log(yaku)
    return getScoreFromYaku(yaku)
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
        ret.secondNumber = checkersResult.secondNumber
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
function numbersCounter(hand) {
    let ret = { pairs: 0, threeCard: false, fourCard: false, numbersScore: -1, secondNumber: -1, numbersSuit: '' }

    const numbersArray = deepcopyArray(hand).map(card => card.number)
    const numbersSet = [...new Set(deepcopyArray(numbersArray))]

    // 空ならブタ、1種類なら数でワンペア・スリーカード・フォーカードが判別可能
    // 2種類ならツーペアかフルハウスなので個別に判定ロジック組めば良い
    const doubledCards = getDifferenceArrays(numbersArray, numbersSet)

    // ブタの判別
    if(doubledCards.length == 0) return ret 

    // ワンペア、スリーカード、フォーカードの判別
    const doubledCardsSet = [...new Set(deepcopyArray(doubledCards))]
    if(doubledCardsSet.length == 1) {
        ret.numbersScore = score(doubledCardsSet[0])
        const suitsArray = deepcopyArray(hand)
                            .filter(card => card.number === doubledCardsSet[0])
                            .map(card => card.suit)
                            .sort()

        if(doubledCards.length == 1) {
            // ワンペア
            ret.pairs = 1
            ret.numbersSuit = suitsArray[suitsArray.length-1]
        } else if (doubledCards.length == 2) {
            // スリーカード
            ret.threeCard = true
            ret.numbersSuit = ''
        } else if (doubledCards.length == 3) {
            // フォーカード
            ret.fourCard = true
            ret.numbersSuit = ''
        }
    } else if (doubledCardsSet.length == 2) {
        if (doubledCards.length == 2) {
            // ツーペア
            ret.pairs = 2
            // TODO 2番目のペアの数字とスートどうしよう            
        } else if (doubledCards.length == 3) {
            // フルハウス
            ret.pairs = 1
            ret.threeCard = true
            ret.numbersSuit = ''

            const tripledNumber = getDifferenceArrays(doubledCards, doubledCardsSet)[0]
            ret.numbersScore = score(tripledNumber)
        }
    }
    return ret
}

function flashChecker(hand) {
    return { flash: [...new Set(hand.map(card => card.suit))].length === 1, flashSuit: hand[0].suit }
}

function straightChecker(hand) {
    const sortedHand = hand.sort((a, b) => score(a.number)-score(b.number))
    const scoreDiff = Math.abs(score(sortedHand[4].number)-score(sortedHand[0].number))
    const numbers = [...new Set(deepcopyArray(sortedHand).map(card => card.number))]

    if(scoreDiff === 4 && numbers.length === 5) return { straight: true, straightSuit: sortedHand[maxIndex].suit }
    return { straight: false, straightSuit: '' }
}

function deepcopyArray(arr){
    return JSON.parse(JSON.stringify(arr))
}

function getDifferenceArrays(arr1, arr2){
    let ret = deepcopyArray(arr1)
    arr2.forEach(item => { ret.splice(ret.indexOf(item), 1) })
    return ret
}