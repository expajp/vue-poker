import getScore from './getScore.js'

export default (card_a, card_b) => {
    return getScore(card_a.number)-getScore(card_b.number)
}
