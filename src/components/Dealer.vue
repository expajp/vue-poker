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
            this.hand[this.hand.length-1].hide = true;
        }
        // this.$on('postexec', this.postexec)
    },
    methods: {
        postexec: function(playerBust){
            while(!playerBust && calc(this.hand)< 17) {
                this.hand.push(pick())
            }
            this.$emit('result', calc(this.hand))
        }
    }
}
</script>
