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
        this.hand.push(pick())
        this.hand.push(pick())

        this.hand[0].hide = true;

        this.$on('postexec', this.postexec)
    },
    methods: {
        postexec: function(playerBust){
            this.hand[0].hide = false // すべてのカードを公開
            while(!playerBust && calc(this.hand)< 17) {
                this.hand.push(pick())
            }
            this.$emit('result', calc(this.hand))
        }
    }
}
</script>
