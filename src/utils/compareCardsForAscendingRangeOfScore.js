import score from './score.js'

export default (card_a, card_b) => {
    return score(card_a.number)-score(card_b.number)
}
