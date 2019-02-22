import score from './score.js'
import compareCardsForAscendingRangeOfScore from './compareCardsForAscendingRangeOfScore.js'
import parseHand from './parseHand.js'
import OnePair from './yaku/OnePair.js'

export default (playersHand) => {
    const parsedHand = parseHand(playersHand)
    // return generateJudgingObject(parsedHand)
    return generateJudgingObject(playersHand)
}

function generateJudgingObject(parsedHand){
    // TODO
    const onePair = new OnePair(parsedHand)
    console.log(onePair)
    console.log(onePair.getYakuRank())
    console.log(onePair.getYakuName())
    console.log(onePair.getNumber())
    console.log(onePair.getNumber())
    return onePair
}
