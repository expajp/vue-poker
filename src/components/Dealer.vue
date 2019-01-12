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
            hand: [],
            result: 0
        }
    },
    created: function(){
        // for(let i=0;i<5;i++){
        //     this.hand.push(pick())
        // }
        this.hand.push({ suit: 'spade',   number:  1})
        this.hand.push({ suit: 'heart',   number:  1})
        this.hand.push({ suit: 'diamond', number: 12})
        this.hand.push({ suit: 'club',    number: 11})
        this.hand.push({ suit: 'diamond', number:  9})
        this.hand.forEach(card => { 
            card.hide = false 
            card.selected = false
        })
        this.hand.sort((a, b) => { return score(a.number)-score(b.number) })
        this.$on('postexec', this.postexec)
    },
    methods: {
        postexec: function(){
            this.result = calc(this.hand)
            this.$emit('result', this.result)
        }
    }
}
</script>
