/*
 Array.prototype.some()
 引数に指定された関数に次々に配列の要素を代入し、ひとつでもtrueを返すものがあればtrueを返す
 Rubyで言えば Array#any?
*/
export default hand => {
    const points = hand.map(card => (card.number > 10 ? 10 : card.number))
    const sum = points.reduce((ret, cur) => ret + cur)

    if(sum > 21) return 'Burst!!' // 21を超えるとバースト
    if(sum <= 11 && points.some(a => a === 1)) return sum + 10 // Aを含み、合計が11以下なら1つを11として扱う（+10する）
    return sum
}
