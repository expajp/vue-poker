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
import pickCard from '../utils/pickCard.js'
import JudgingObjectFactory from '../utils/JudgingObjectFactory.js'
import cmpCardsByScoreAsc from '../utils/cmpCardsByScoreAsc.js'
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
    created() {
        for(let i=0;i<5;i++){
            this.hand.push(pickCard())
        }
        this.hand.forEach(card => { card.hide = true })
        this.hand.sort((a, b) => cmpCardsByScoreAsc(a, b))
        this.$on('postexec', this.postexec)
    },
    methods: {
        postexec() {
            this.result = JudgingObjectFactory(this.hand)
            this.hand.forEach(card => { card.hide = false })
            this.$emit('result', this.result)
        }
    }
}
</script>
