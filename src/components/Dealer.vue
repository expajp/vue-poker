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
import sort from '../utils/sort.js'
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
        for(let i=0;i<5;i++){
            this.hand.push(pick())
        }
        this.hand.forEach(card => { card.hide = true })
        this.hand.sort((a, b) => sort(a, b))
        this.$on('postexec', this.postexec)
    },
    methods: {
        postexec: function(){
            this.result = calc(this.hand)
            this.hand.forEach(card => { card.hide = false })
            this.$emit('result', this.result)
        }
    }
}
</script>
