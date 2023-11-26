import { describe, it, expect, test } from "vitest"
import { mount } from "@vue/test-utils"
import Counter from "../Counter.vue"

describe("Counter", () => {
    it("has a button", () => {
        const wrapper = mount(Counter)
        expect(wrapper.find('button').exists()).toBe(true)
    });

    it("updates on click", async () => {
        const wrapper = mount(Counter)
        const button = wrapper.find('button');
        expect(wrapper.text()).toBe("count is 0")
        await button.trigger('click')
        expect(wrapper.text()).toBe("count is 1")
    });

    test('emits change event with count when clicked', async () => {
        const wrapper = mount(Counter)

        await wrapper.find('button').trigger('click')
        await wrapper.find('button').trigger('click')

        expect(wrapper.emitted()).toHaveProperty('change')

        // `emitted()` accepts an argument. It returns an array with all the
        // occurrences of `this.$emit('increment')`.
        const incrementEvent = wrapper.emitted<number[]>('change')!

        // We have "clicked" twice, so the array of `increment` should
        // have two values.
        expect(incrementEvent).toHaveLength(2)

        // Assert the result of the first click.
        // Notice that the value is an array.
        expect(incrementEvent[0]).toEqual([1])

        // Then, the result of the second one.
        expect(incrementEvent[1]).toEqual([2])
    })

})