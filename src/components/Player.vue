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
            <button @click="change" v-show="!changed">Change</button>
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
import compareCardsForAscendingRangeOfScore from '../utils/compareCardsForAscendingRangeOfScore.js'
import Card from './Card'
import isEqualCards from '../utils/isEqualCards.js'

export default {
    name: 'player',
    components: { Card },
    props: ['showButtons'],
    data() {
        return {
            hand: [],
            changed: false,
            result: 0
        }
    },
    created: function(){
        for(let i=0;i<5;i++) this.hand.push(pick())
        this.hand.forEach(card => { 
            card.hide = false 
            card.selected = false
        })
        this.hand.sort((a, b) => compareCardsForAscendingRangeOfScore(a, b))
    },
    computed: {
        selected: function(){ 
            return this.hand.filter(card => card.selected) 
        }
    },
    methods: {
        // カードを選択したときの処理、Cardコンポーネントから発火させる
        select: function(card){
            const selectedCard = this.hand.find(elm => isEqualCards(elm, card))
            selectedCard.selected = !card.selected
        },
        change: function(){
            if(this.selected.length > 0) this.changed = true

            this.selected.forEach(card => {
                const handIdx = this.hand.findIndex(elm => isEqualCards(elm, card))
                this.hand.splice(handIdx, 1, pick(true))

                const selectedIdx = this.selected.findIndex(elm => isEqualCards(elm, card))
                this.selected.splice(selectedIdx, 1, this.hand[handIdx])
            })
            this.stand()
        },
        stand: function(){
            this.result = calc(this.hand)
            this.hand.forEach(card => { card.selected = false })
            this.$emit('stand', this.result)
        }
    }
}
</script>
