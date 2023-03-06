import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import SplashScreen from '@/components/SplashScreen'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import { todo } from '@/test/utils/storeHelper'
import i18Mock from '~/test/utils/i18nMock'
import localVue from '~/test/utils/vueInstanceFactory'
import SPLogo from "@/assets/img/leaf-lg.svg";

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
    const mounted = shallowMount(SplashScreen, {
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

describe('@/components/SplashScreen', () => {
    it("", async () => {
        const wrapper = wrapperFactory();
        expect(
            wrapper.get('[data-testid="todo-text"]').text()
          ).toBe(i18Mock.en['logo.text'])
      });
    
  it("@/assets/img/leaf-lg.svg", async () => {
    const wrapper = wrapperFactory();
    expect(wrapper.findComponent(SPLogo).exists()).toBe(true);
  });
})
