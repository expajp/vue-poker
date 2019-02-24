<template>
    <div id="game">
        <dealer ref="dealer" @result="postexec" />
        <div class="message">
            {{ mainMessage }}
        </div>
        <player @stand="stand" :showButtons="showButtons" />
        <div class="message result">
            {{ resultMessage }}
        </div>
    </div>
</template>

<style>
.dealer{
    margin-top: 40px;
}
.player{
    margin-top: 40px;
}

</style>


<script>
import Dealer from './Dealer'
import Player from './Player'
// import judgeVictoryOrDefeat from '../utils/judgeVictoryOrDefeat.js'

export default {
    name: 'game',
    components: { Dealer, Player },
    data() {
        return {
            mainMessage: 'Welcome to Poker',
            playersResult: 0,
            dealersResult: 0,
            showButtons: true
        }
    },
    methods: {
        stand: function(playersResult){
            this.playersResult = playersResult
            this.$refs.dealer.$emit('postexec')
        },
        postexec: function(dealersResult){
            this.showButtons = false
            this.dealersResult = dealersResult
            this.mainMessage = `Dealer : ${dealersResult.getYakuName()} / Player : ${this.playersResult.getYakuName()}`
        },
        judgeVictoryOrDefeat: function(players, dealers) {
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
    },
    computed: {
        resultMessage: function(){
            if(this.showButtons) return ''
            return this.judgeVictoryOrDefeat(this.playersResult, this.dealersResult)
        }
    }
}
</script>
