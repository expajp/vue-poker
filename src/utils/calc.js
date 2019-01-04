import score from './score.js'

/*
 Array.prototype.some()
 引数に指定された関数に次々に配列の要素を代入し、ひとつでもtrueを返すものがあればtrueを返す
 Rubyで言えば Array#any?
*/
export default hand => {
    const yaku = getYaku(hand)
    console.log(JSON.parse(JSON.stringify(yaku)))
}

function getYaku(hand){
    const checkersResult = Object.assign(numbersCounter(hand), flashChecker(hand), straightChecker(hand), scoreChecker(hand))
    console.log(JSON.stringify(checkersResult))
    const sortedHand = hand.sort((a, b) => { return a.number - b.number })
    const suits = hand.map(card => { return card.suit } ).sort()
    let ret = { yaku: 'None', score: sortedHand[sortedHand.length-1].number, suit: sortedHand[sortedHand.length-1].suit }

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
    if(checkersResult.straight && checkersResult.flash && checkersResult.score == 12){
        ret.suit = checkersResult.straightSuit
        ret.yaku = 'RoyalStraightFlash'
    }
    return ret
}
function numbersCounter(hand) {
    let ret = { pairs: 0, threeCard: false, fourCard: false, numbersScore: 0, numbersSuit: '' }
    
    const numbers = hand.map(card => { return card.number } ).sort()
    const numbersCounter = [...new Set(numbers)]

    numbersCounter.forEach(number => {
        const filteredCards = numbers.filter(num => { return num === number })
        const count = filteredCards.length
        const suits = filteredCards.map(card => { return card.suit } ).sort()
        switch(count){
            case 2:
                ret.pairs += 1 
                if(ret.numbersScore < score(number)){
                    ret.numbersSuit = suits[suits.length-1]
                    ret.numbersScore = score(number)
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
    return { flash: [...new Set(hand.map(card => { card.suit } ))].length === 1, flashSuit: hand[0].suit }
}

function straightChecker(hand) {
    const sortedHand = hand.sort((a, b) => { return score(a.number)-score(b.number) })
    const maxIndex = sortedHand.length-1
    const scoreDiff = Math.abs(score(sortedHand[maxIndex].number)-score(sortedHand[0].number))

    if(scoreDiff === maxIndex) return { straight: true, straightSuit: sortedHand[maxIndex].suit }
    return { straight: false, straightSuit: '' }
}

function scoreChecker(hand) {
    return { score: Math.max(hand.map(card => { return card.number })) }
}
