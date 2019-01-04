import { decl } from "postcss";

const deck = []
;['spade', 'club', 'diamond', 'heart'].forEach(suit =>{
    Array.from(Array(13), (_, i) => ++i).forEach(number => {
        deck.push({ suit, number, hide: false, selected: false })
    })
})

/* 
 export文は指定モジュールから関数、オブジェクト、プリミティブをエクスポートする
 外部からこのファイルがimportされたとき、とくに指定がなければこの関数が呼ばれる
 つまり、import pick from "deck"したとき、pickにこの関数が格納される
*/
export default (selected) => {
    let card = deck.splice(Math.floor(Math.random() * Math.floor(deck.length)), 1)[0]
    console.log(card)
    card.selected = selected ? true : false
    return card
}
