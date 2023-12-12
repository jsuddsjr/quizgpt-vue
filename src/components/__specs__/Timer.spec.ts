import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Timer from "../Timer.vue";

describe("Timer", () => {
  it("mounts", () => {
    const wrapper = mount(Timer, {
      propsData: {
        seconds: 30,
      },
    });
    expect(wrapper.text()).toBe("0:30");
  });

  it("counts down every second", async () => {
    const wrapper = mount(Timer, {
      propsData: {
        seconds: 30,
      },
    });

    // await delay(1)
    wrapper.vm._tick();

    // allow the DOM to re-render
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toBe("0:29");
  });
});
