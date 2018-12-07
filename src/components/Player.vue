<template>
    <div class="player">
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
    name: 'player',
    components: { Card },
    props: { 'showButtons' },
    data() {
        return {
            hand: [],
            result: 0
        }
    },
    created: function(){
        this.hand.push(pick())
        this.hand.push(pick())
        this.result = calc(this.hand)
    },
    methods: {
        hit(){
            this.hand.push(pick())
            this.result = calc(this.hand)
        },
        stand(){
            this.$emit('stand', this.result)
        }
    },
    watch: {
        result: function(oldValue, newValue){
            if (newValue == 'Burst!!') this.$emit('stand', newValue)
        }
    }
}
</script>
