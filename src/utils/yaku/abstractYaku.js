// AbstractYaku
export default class {
    constructor(hand){
        
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
    getNumber(){
        throw new Error('getNumber()を定義してください')
    }
    // 勝敗判定に使う2つめの数字を返す
    // ツーペア以外では定義しない
    getSecondNumber(){
        throw new Error('getSecondNumber()を定義してください')
    }
    // 勝敗判定に使うスートを返す
    getSuit(){
        throw new Error('getSuit()を定義してください')
    }

}