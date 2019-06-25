import Hand from "./Hand";
import {
  FourCard,
  None,
  RoyalStraightFlash,
  StraightFlash,
  TwoPair,
  Flash,
  FullHouse,
  OnePair,
  Straight,
  ThreeCard
} from "../yaku";

export default playersHand => generateJudgingObject(new Hand(playersHand));

function generateJudgingObject(hand) {
  if (hand.isFlash()) {
    if (hand.isStraight()) {
      if (hand.getMaxScore() === 12) return new RoyalStraightFlash(hand);
      else return new StraightFlash(hand);
    } else {
      return new Flash(hand);
    }
  }
  if (hand.isFourCard()) return new FourCard(hand);
  if (hand.isFullHouse()) return new FullHouse(hand);
  if (hand.isStraight()) return new Straight(hand);
  if (hand.isThreeCard()) return new ThreeCard(hand);
  if (hand.isTwoPair()) return new TwoPair(hand);
  if (hand.isOnePair()) return new OnePair(hand);
  if (hand.hasNone()) return new None(hand);
}
