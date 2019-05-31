<template>
    <div class="player">
        <div class="flex cards">
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
            <div class="btn-group" role="group">
                <button class="btn btn-primary" @click="change" v-show="!changed">Change</button>
            </div>
            <div class="btn-group" role="group">
                <button class="btn btn-secondary" @click="stand">Stand</button>
            </div>
        </div>
    </div>    
</template>

<style>
.flex {
    display: flex;
    justify-content: center;
}

.cards {
    margin-bottom: 20px;
}

.btn-group {
    margin: 0 5px;
}
</style>

<script>
import pickCard from '../utils/pickCard.js'
import JudgingObjectFactory from '../utils/JudgingObjectFactory.js'
import compareCardsByScoreAsc from '../utils/compareCardsByScoreAsc.js'
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
    created() {
        for(let i=0;i<5;i++) this.hand.push(pickCard())
        this.hand.forEach(card => { 
            card.hide = false 
            card.selected = false
        })
        this.hand.sort((a, b) => compareCardsByScoreAsc(a, b))
    },
    computed: {
        selected() { 
            return this.hand.filter(card => card.selected) 
        }
    },
    methods: {
        // カードを選択したときの処理、Cardコンポーネントから発火させる
        select(card) {
            const selectedCard = this.hand.find(elm => isEqualCards(elm, card))
            selectedCard.selected = !card.selected
        },
        change() {
            if(this.selected.length > 0) this.changed = true

            this.selected.forEach(card => {
                const handIdx = this.hand.findIndex(elm => isEqualCards(elm, card))
                this.hand.splice(handIdx, 1, pickCard(true))

                const selectedIdx = this.selected.findIndex(elm => isEqualCards(elm, card))
                this.selected.splice(selectedIdx, 1, this.hand[handIdx])
            })
            this.stand()
        },
        stand() {
            this.result = JudgingObjectFactory(this.hand)
            this.hand.forEach(card => { card.selected = false })
            this.$emit('stand', this.result)
        }
    }
}
</script>
