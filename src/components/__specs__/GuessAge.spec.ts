import { describe, it, expect, test } from "vitest"
import { mount } from "@vue/test-utils"
import GuessAge from "../GuessAge.vue"

describe("GuessAge", () => {
  it("Test GuessAge component props", () => {
    const wrapper = mount(GuessAge, {
      propsData: {
        title: "Testing"
      }
    })
    expect(wrapper.props().title).toBe("Testing");
  });

  it("Test if data is a function", () => {
    expect(typeof GuessAge.data).toBe("function");
  });

  test("Test snapshot", () => {
    const wrapper = mount(GuessAge, {})
    expect(wrapper.text()).toMatchSnapshot();
  });

});
