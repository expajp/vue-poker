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

export default {
    name: 'game',
    components: { Dealer, Player },
    data() {
        return {
            mainMessage: 'Welcome to Black Jack',
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
            this.mainMessage = `Dealer : ${dealersResult.comparableStr} ${dealersResult.yaku} / Player : ${this.playersResult.comparableStr} ${this.playersResult.yaku}`
        },
    },
    computed: {
        resultMessage: function(){
            if(this.showButtons) return ''
            if(this.playersResult.comparableStr > this.dealersResult.comparableStr) return 'You Win'
            if(this.playersResult.comparableStr < this.dealersResult.comparableStr) return 'You Lose'
            return 'Error!!'
        }
    }
}
</script>
