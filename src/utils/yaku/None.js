import AbstractYaku from "./AbstractYaku";

// Noneクラス（ブタ）
export default class extends AbstractYaku {
    constructor(hand){
        super(hand)
    }

    // 役のランクを返す
    getYakuRank(){
        return 0
    }
    // 役の名前を返す
    getYakuName(){
        return 'None'
    }
}
