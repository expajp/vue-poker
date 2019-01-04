<template>
    <div class="dealer">
        <div class="flex">
            <card
                v-for="(card, index) in hand"
                :key="index"
                :suit="card.suit"
                :number="card.number"
                :hide="card.hide"
            >                
            </card>
        </div>
    </div>    
</template>

<script>
import pick from '../utils/deck.js'
import calc from '../utils/calc.js'
import score from '../utils/score.js'
import Card from './Card'

export default {
    name: 'dealer',
    components: { Card },
    data() {
        return {
            hand: []
        }
    },
    created: function(){
        for(let i=0;i<5;i++){
            this.hand.push(pick())
        }
        this.hand.sort((a, b) => { return score(a.number)-score(b.number) })
        this.$on('postexec', this.postexec)
    },
    methods: {
        postexec: function(){
            calc(this.hand)
            /*
            this.$emit('result', calc(this.hand))
            */
        }
    }
}
</script>
