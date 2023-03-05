import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import FilterButtons from '@/components/FilterButtons'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import { todo } from '@/test/utils/storeHelper'
import i18Mock from '~/test/utils/i18nMock'
import localVue from '~/test/utils/vueInstanceFactory'

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
    const mounted = shallowMount(FilterButtons, {
      localVue,
      i18n,
      store,
      ...additionalData,
      
    })
    return mounted
  }

describe('@/components/FilterButtons', () => {
  describe("Vuex Action calls", () => {
    it("Calls todo/setCurrentFilter when filter is changed from select", async () => {
      const wrapper = await wrapperFactory();

      const selectFilter = wrapper.find('[data-testid="change-filter-button"]');
      await selectFilter.trigger("change");
      
      expect(todo.actions.setCurrentFilter).toHaveBeenCalled()
    });

    it("Calls todo/setCurrentFilter when all filter is clicked", async () => {
      const wrapper = await wrapperFactory();

      const allFilter = wrapper.find('[data-testid="all-filter-button"]');
      await allFilter.trigger("click");
      
      expect(todo.actions.setCurrentFilter).toHaveBeenCalled()
    });
  });
})
