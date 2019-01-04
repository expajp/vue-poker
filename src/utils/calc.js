import score from './score.js'

/*
 Array.prototype.some()
 引数に指定された関数に次々に配列の要素を代入し、ひとつでもtrueを返すものがあればtrueを返す
 Rubyで言えば Array#any?
*/
export default (playersHand) => {
    const yaku = getYaku(playersHand)
    console.log(yaku)
    return yaku
}

function getYaku(hand){
    const checkersResult = Object.assign(numbersCounter(hand), flashChecker(hand), straightChecker(hand))
    console.log(JSON.stringify(checkersResult))
    const sortedHand = deepcopyArray(hand).sort((a, b) => { return score(a.number) - score(b.number) })
    let ret = { yaku: 'None', score: score(sortedHand[sortedHand.length-1].number), suit: sortedHand[sortedHand.length-1].suit }

    if(checkersResult.pairs == 1){
        ret.score = checkersResult.numbersScore
        ret.suit = checkersResult.numbersSuit
        ret.yaku = 'OnePair'
    }
    if(checkersResult.pairs == 2){
        ret.score = checkersResult.numbersScore
        ret.suit = checkersResult.numbersSuit
        ret.yaku = 'TwoPair'
    } 
    if(checkersResult.threeCard){
        ret.suit = checkersResult.numbersSuit
        ret.yaku = 'ThreeCard'
    }
    if(checkersResult.straight) ret.yaku = 'Straight'
    if(checkersResult.flash){
        ret.suit = checkersResult.flashSuit
        ret.yaku = 'Flash'
    }
    if(checkersResult.pairs == 1 && checkersResult.threeCard) ret.yaku = 'FullHouse'
    if(checkersResult.fourCard) ret.yaku = 'FourCard'
    if(checkersResult.straight && checkersResult.flash){
        ret.suit = checkersResult.straightSuit
        ret.yaku = 'StraightFlash'
    }
    if(checkersResult.straight && checkersResult.flash && ret.score === 12){
        ret.suit = checkersResult.straightSuit
        ret.yaku = 'RoyalStraightFlash'
    }
    return ret
}
function numbersCounter(hand) {
    let ret = { pairs: 0, threeCard: false, fourCard: false, numbersScore: -1, numbersSuit: '' }
    
    const numbers = deepcopyArray(hand).map(card => { return card.number } ).sort()
    const numbersCounter = [...new Set(numbers)]

    numbersCounter.forEach(number => {
        const filteredCards = deepcopyArray(hand).filter(card => { return card.number === number })
        const count = filteredCards.length
        const suits = filteredCards.map(card => { return card.suit } ).sort()

        switch(count){
            case 2:
                ret.pairs += 1 
                if(ret.numbersScore < score(number)){
                    ret.numbersSuit = suits[suits.length-1]
                    ret.numbersScore = score(number)
                    console.log(ret)
                }
                break
            case 3: 
                ret.threeCard = true
                ret.numbersSuit = ''
                ret.numbersScore = score(number); break
            case 4: 
                ret.fourCard = true
                ret.numbersSuit = ''
                ret.numbersScore = score(number); break
            default: 
                break
        }
    })
    return ret
}

function flashChecker(hand) {
    return { flash: [...new Set(hand.map(card => { return card.suit } ))].length === 1, flashSuit: hand[0].suit }
}

function straightChecker(hand) {
    const sortedHand = hand.sort((a, b) => { return score(a.number)-score(b.number) })
    const maxIndex = sortedHand.length-1
    const scoreDiff = Math.abs(score(sortedHand[maxIndex].number)-score(sortedHand[0].number))
    const numbers = [...new Set(deepcopyArray(sortedHand).map(card => { return card.number }))]

    if(scoreDiff === maxIndex && numbers.length == hand.length) return { straight: true, straightSuit: sortedHand[maxIndex].suit }
    return { straight: false, straightSuit: '' }
}

function deepcopyArray(arr){
    return JSON.parse(JSON.stringify(arr))
}