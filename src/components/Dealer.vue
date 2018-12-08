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
        <div class="flex" v-show="showButtons">
            <button @click="hit">Hit</button>
            <button @click="stand">Stand</button>
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
        postexec(playerBurst){
            this.hand[0].hide = false // すべてのカードを公開
            while(!playerBurst && calc(this.hand)< 17) this.hand.push(pick())
            this.$emit('result', calc(this.hand))
        }
    }
}
</script>
