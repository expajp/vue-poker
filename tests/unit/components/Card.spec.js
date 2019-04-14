import { renderToString } from '@vue/server-test-utils'
import Card from '@/components/Card.vue'

describe('カードに合った画像のパスが指定されている', () => {    
    it('画像のパスにcard_heart_01が含まれている', async () => {
        const card = await renderToString(Card, { 
            props: {
                number: 1,
                suit: 'heart',
                selected: false,
                hide: false
            } 
        })

        expect(card).toContain('card_heart_01')
    })
})
