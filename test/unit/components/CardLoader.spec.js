import { describe, expect, it } from "@jest/globals";
import { shallowMount } from "@vue/test-utils";
import CardLoader from "@/components/CardLoader";
import LoaderIcon from "@/assets/img/loader.svg";

const wrapperFactory = () => {
  const mounted = shallowMount(CardLoader);
  return mounted;
};

describe("@/components/CardLoader", () => {
  it("@/assets/img/loader.svg", () => {
    const wrapper = wrapperFactory();
    expect(wrapper.findComponent(LoaderIcon).exists()).toBe(true);
  });
});
