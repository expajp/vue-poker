<template>
    <div class="player">
        <div class="flex">
            <card
                v-for="(card, index) in hand"
                :key="index"
                :suit="card.suit"
                :number="card.number"
                :selected="card.selected"
                v-on:select="select"
            >                
            </card>
        </div>
        <div class="flex" v-show="showButtons">
            <button @click="change">Change</button>
            <button @click="stand">Stand</button>
        </div>
    </div>    
</template>

<style>
.flex {
    display: flex;
}

</style>

<script>
import pick from '../utils/deck.js'
import calc from '../utils/calc.js'
import Card from './Card'

export default {
    name: 'player',
    components: { Card },
    props: ['showButtons'],
    data() {
        return {
            hand: [],
            selected: [],
            result: 0
        }
    },
    created: function(){
        for(let i=0;i<5;i++) this.hand.push(pick())
    },
    methods: {
        select: function(card){
            const selectedCard = this.hand.find(
                // handに入っているのはVueコンポーネントでなくオブジェクトなのでnumberとsuitで一致を取る
                elm => { return elm.number === card.number && elm.suit === card.suit }
            )
            if(card.selected){
                this.selected.splice(selectedCard, 1)
            } else {
                this.selected.push(selectedCard)
            }
            selectedCard.selected = !card.selected
            
            console.log(this.selected)
        },
        change: function(){
            console.log('hoge')
            // TODO
        },
        stand: function(){
            this.$emit('stand', this.result)
        }
    }
}
</script>
