import { shallowMount } from '@vue/test-utils'
import Card from '@/components/Card.vue'

describe('test for test', () => {
    const wrapper = shallowMount(Card, {
        propsData: {
            number: 1,
            suit: 'heart',
            selected: false,
            hide: false
        }
    })

    it('renders hoge', () => {
        expect(wrapper.find('#hoge').text()).toEqual('ほげ')
    })
})
