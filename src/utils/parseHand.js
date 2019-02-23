import getScore from './getScore.js'
import compareCardsForAscendingRangeOfScore from './compareCardsForAscendingRangeOfScore.js'
import deepcopyArray from './deepcopyArray.js'
import getDifferenceArrays from './getDifferenceArrays.js'

export default (hand) => {
    return Object.assign(numbersCounter(hand), flashChecker(hand), straightChecker(hand))
}

function numbersCounter(hand) {
    let ret = { pairs: 0, threeCard: false, fourCard: false, numbersScore: -1, secondNumbersScore: -1, numbersSuit: '' }

    const numbersArray = deepcopyArray(hand).map(card => card.number)
    const numbersSet = [...new Set(deepcopyArray(numbersArray))]

    // 空ならブタ、1種類なら数でワンペア・スリーカード・フォーカードが判別可能
    // 2種類ならツーペアかフルハウスなので個別に判定ロジック組めば良い
    const doubledNumbers = getDifferenceArrays(numbersArray, numbersSet)

    // ブタの判別
    if(doubledNumbers.length == 0) return ret 

    // ワンペア、スリーカード、フォーカードの判別
    const doubledNumbersSet = [...new Set(deepcopyArray(doubledNumbers))]
    if(doubledNumbersSet.length == 1) {
        ret.numbersScore = getScore(doubledNumbersSet[0])
        const suitsArray = deepcopyArray(hand)
                            .filter(card => card.number === doubledNumbersSet[0])
                            .map(card => card.suit)
                            .sort()

        if(doubledNumbers.length == 1) {
            // ワンペア
            ret.pairs = 1
            ret.numbersSuit = suitsArray[suitsArray.length-1]
        } else if (doubledNumbers.length == 2) {
            // スリーカード
            ret.threeCard = true
            ret.numbersSuit = ''
        } else if (doubledNumbers.length == 3) {
            // フォーカード
            ret.fourCard = true
            ret.numbersSuit = ''
        }

    // ツーペア、フルハウスの判別
    } else if (doubledNumbersSet.length == 2) {
        if (doubledNumbers.length == 2) {
            // ツーペア
            ret.pairs = 2

            const twoPairedNumbers = doubledNumbers.sort((a, b) => compareCardsForAscendingRangeOfScore(a, b))
            ret.numbersScore = getScore(twoPairedNumbers[1])
            ret.secondNumbersScore = getScore(twoPairedNumbers[0])
            
            ret.numbersSuit = deepcopyArray(hand)
                                .filter(card => card.number == twoPairedNumbers[1] )
                                .sort()[1]
                                .suit
        } else if (doubledNumbers.length == 3) {
            // フルハウス
            ret.pairs = 1
            ret.threeCard = true
            ret.numbersSuit = ''

            const tripledNumber = getDifferenceArrays(doubledNumbers, doubledNumbersSet)[0]
            ret.numbersScore = getScore(tripledNumber)
        }
    }
    return ret
}

function flashChecker(hand) {
    return { flash: [...new Set(hand.map(card => card.suit))].length === 1, flashSuit: hand[0].suit }
}

function straightChecker(hand) {
    const sortedHand = hand.sort((a, b) => getScore(a.number)-getScore(b.number))
    const scoreDiff = Math.abs(getScore(sortedHand[4].number)-getScore(sortedHand[0].number))
    const numbers = [...new Set(deepcopyArray(sortedHand).map(card => card.number))]

    if(scoreDiff === 4 && numbers.length === 5) return { straight: true, straightSuit: sortedHand[maxIndex].suit }
    return { straight: false, straightSuit: '' }
}

