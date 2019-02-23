export default (players, dealers) => {
    // 両方Noneなら引き分け
    if(players.getYakuName() === 'None' && dealers.getYakuName() === 'None') return 'Draw'

    // 役が異なる
    if(players.getYakuRank() > dealers.getYakuRank()) return 'You Win'
    if(players.getYakuRank() < dealers.getYakuRank()) return 'You Lose'

    // 役が同じ
    // 数字を比較
    if(players.getScore() > dealers.getScore()) return 'You Win'
    if(players.getScore() < dealers.getScore()) return 'You Lose'
    
    // ツーペアどうしで、高い方のペアの数字が同じ
    if(players.getYakuName() === 'TwoPair'){
        if(players.getSecondScore() > dealers.getSecondScore()) return 'You Win'
        if(players.getSecondScore() < dealers.getSecondScore()) return 'You Lose'
    }
    
    // 役も数字も同じ
    if(players.getSuit() > dealers.getSuit()) return 'You Win'
    if(players.getSuit() < dealers.getSuit()) return 'You Lose'

    throw new Error('勝敗が判定できません')
}