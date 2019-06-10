const deck = []
;['spade', 'club', 'diamond', 'heart'].forEach(suit => {
    Array.from(Array(13), (_, i) => ++i).forEach(number => {
        deck.push({ suit, number, hide: false, selected: false })
    })
})

export default (selected) => {
    let card = deck.splice(Math.floor(Math.random() * Math.floor(deck.length)), 1)[0]
    if(card === undefined) return undefined

    card.selected = selected ? true : false
    return card
}
