/*
 Array.prototype.some()
 引数に指定された関数に次々に配列の要素を代入し、ひとつでもtrueを返すものがあればtrueを返す
 Rubyで言えば Array#any?
*/
export default hand => {
    const ret = Object.assign(numbersCounter(hand), flashChecker(hand), straightChecker(hand)) 
    console.log(JSON.stringify(ret))

    // TODO スートの強さを判定するロジック
    // TODO ストレートのときのスコア
    
    return ret
}

function numbersCounter(hand) {
    let ret = { pairs: 0, threeCard: false, fourCard: false, score: 0 }
    
    const numbers = hand.map( card => { return card.number } ).sort()
    const numbersCounter = [...new Set(numbers)]

    numbersCounter.forEach(number => {
        const count = numbers.filter(num => { return num === number }).length
        switch(count){
            case 2:
                ret.pairs += 1
                ret.score = (ret.score < score(number) ? score(number) : ret.score); break
            case 3: 
                ret.threeCard = true
                ret.score = score(number); break
            case 4: 
                ret.fourCard = true
                ret.score = score(number); break
            default: 
                break
        }
    })
    return ret
}

function flashChecker(hand) {
    return { flash: [...new Set(hand)].length === 1 }
}

function straightChecker(hand) {
    const numbers = hand.map( card => { return card.number } ).sort()
    const maxIndex = numbers.length-1
    return { straight: score(numbers[maxIndex])-score(numbers[0]) === maxIndex }
}

function score(n){
    return (n+11)%13
}
