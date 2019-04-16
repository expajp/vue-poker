import { shallowMount } from '@vue/test-utils'
import Card from '@/components/Card.vue'

describe('カードに合った画像のパスが指定されている', () => {    
    it('画像のパスにcard_heart_01が含まれている', () => {
        const card = shallowMount(Card, { 
            propsData: {
                number: 1,
                suit: 'heart',
                selected: false,
                hide: false
            } 
        })
        
        expect(card.html()).toContain('card_heart_01')
    })
})
