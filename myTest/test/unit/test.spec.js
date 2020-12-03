/*
 * @Author: nigel
 * @Date: 2020-05-15 15:40:35
 * @LastEditTime: 2020-05-19 14:54:10
 */
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import counter from '../../src/views/counter/counter.vue';

describe('Counter.vue', () => {
    it('increments count when button is clicked', () => {
        const wrapper = shallowMount(counter);
        wrapper.find('button').trigger('click');
        expect(wrapper.find('div').text()).contains('1');
    });
});