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
import score from '../utils/score.js'
import Card from './Card'

export default {
    name: 'player',
    components: { Card },
    props: ['showButtons'],
    data() {
        return {
            hand: [],
            selected: [],
            changed: false,
            result: 0
        }
    },
    created: function(){
        // for(let i=0;i<5;i++) this.hand.push(pick())
        this.hand.push({ suit: 'club',    number:  1})
        this.hand.push({ suit: 'diamond', number:  1})
        this.hand.push({ suit: 'spade',   number:  2})
        this.hand.push({ suit: 'heart',   number:  3})
        this.hand.push({ suit: 'spade',   number:  9})
        this.hand.forEach(card => { 
            card.hide = false 
            card.selected = false
        })
        this.hand.sort((a, b) => { return score(a.number)-score(b.number) })
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
        },
        change: function(){
            if(this.selected.length > 0) this.changed = true

            this.selected.forEach(selected => {
                const handIdx = this.hand.findIndex(elm => {
                    return elm.number === selected.number && elm.suit === selected.suit
                })
                this.hand.splice(handIdx, 1, pick(true))

                const selectedIdx = this.selected.findIndex(elm => {
                    return elm.number === selected.number && elm.suit === selected.suit
                })
                this.selected.splice(selectedIdx, 1, this.hand[handIdx])
            })
        },
        stand: function(){
            this.result = calc(this.hand)
            this.$emit('stand', this.result)
        }
    }
}
</script>
