// AbstractYaku
export default class {
    constructor(hand){
        this.hand = hand
    }

    // 役のランクを返す
    getYakuRank(){
        throw new Error('getYakuRank()を定義してください')
    }
    // 役の名前を返す
    getYakuName(){
        throw new Error('getYakuName()を定義してください')
    }
    // 勝敗判定に使う数字を返す
    getScore(){
        throw new Error('getScore()を定義してください')
    }
    // 勝敗判定に使う2つめの数字を返す
    // ツーペア以外では定義しない
    getSecondScore(){
        throw new Error('getSecondScore()を定義してください')
    }
    // 勝敗判定に使うスートを返す
    getSuit(){
        throw new Error('getSuit()を定義してください')
    }

}