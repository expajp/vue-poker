import { Hand } from './Hand.js'
import { FourCard, None, RoyalStraightFlash, StraightFlash, TwoPair, Flash, FullHouse, OnePair, Straight, ThreeCard } from './yaku'

export default (playersHand) => {
    const hand = new Hand(playersHand)
    return generateJudgingObject(hand)
}

function generateJudgingObject(hand){
    
}
