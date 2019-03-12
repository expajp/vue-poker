import { shallowMount } from '@vue/test-utils'
import Card from '../../src/components/Card.vue'

test('test for test', () => {
    const wrapper = shallowMount(Card)

    expect(wrapper.find('#hoge').text()).toEqual('ほげ')
})
