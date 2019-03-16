import { shallowMount } from '@vue/test-utils'
import Card from '../../src/components/Card'

describe('test for test', () => {
    const wrapper = shallowMount(Card)

    it('renders hoge', () => {
        expect(wrapper.find('#hoge').text()).toEqual('ほげ')
    })
})
