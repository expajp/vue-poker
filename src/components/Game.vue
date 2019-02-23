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
import judgeVictoryOrDefeat from '../utils/judgeVictoryOrDefeat.js'

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
    },
    computed: {
        resultMessage: function(){
            if(this.showButtons) return ''
            return judgeVictoryOrDefeat(this.playersResult, this.dealersResult)
        }
    }
}
</script>
