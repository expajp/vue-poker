import parseHand from './parseHand.js'
import { FourCard, None, RoyalStraightFlash, StraightFlash, TwoPair, Flash, FullHouse, OnePair, Straight, ThreeCard } from './yaku'

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
    console.log(onePair.getScore())
    return onePair
}
