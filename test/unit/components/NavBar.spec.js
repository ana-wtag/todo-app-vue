import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import NavBar from '@/components/NavBar'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import { todo } from '@/test/utils/storeHelper'
import i18Mock from '~/test/utils/i18nMock'
import localVue from '~/test/utils/vueInstanceFactory'
import Logo from "@/assets/img/leaf.svg";
import SearchIcon from "@/assets/img/search.svg";

let store

const i18n = new VueI18n({
  locale: 'en',
  messages: i18Mock,
})

beforeEach(() => {
  store = new Vuex.Store({
    modules: {
      todo,
    },
  })
})

const wrapperFactory = (additionalData) => {
    const mounted = shallowMount(NavBar, {
      localVue,
      i18n,
      store,
      data:function () {
        return {
          showSearchField: true,
        };
      },
      ...additionalData,
      
    })
    return mounted
  }

describe('@/components/NavBar', () => {
  it("@/assets/img/leaf.svg", async () => {
    const wrapper = wrapperFactory();
    expect(wrapper.findComponent(Logo).exists()).toBe(true);
  });
  it("@/assets/img/search.svg", () => {
    const wrapper = wrapperFactory();
    expect(wrapper.findComponent(SearchIcon).exists()).toBe(true);
  });
})
