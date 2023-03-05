import { describe, expect, it } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import AddTaskCard from '@/components/AddTaskCard'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import { todo } from '@/test/utils/storeHelper'
import i18Mock from '~/test/utils/i18nMock'
import localVue from '~/test/utils/vueInstanceFactory'
import DeleteIcon from "@/assets/img/delete.svg";

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
    const mounted = shallowMount(AddTaskCard, {
      localVue,
      i18n,
      store,
      computed: {
        showForm: () => true,
        },
      ...additionalData,
      
    })
    return mounted
  }

describe('@/components/AddTaskCard', () => {
  describe('Validation Checks', () => {

    it('@/assets/img/delete.svg', () => {
        const wrapper = wrapperFactory()
        expect(wrapper.findComponent(DeleteIcon).exists()).toBe(true)
      })


    it('validation returns false when task title is not provided.', async () => {
      const wrapper = await wrapperFactory()

      const taskTitle = wrapper.find('[data-testid="task-title-input"]')

      const addTaskButton = wrapper.find(
        '[data-testid="add-task-button"]'
      )

      await taskTitle.setValue('')
      const validate = jest.spyOn(wrapper.vm, 'validate')
      await addTaskButton.trigger('click')
      const response = validate()
      expect(response).toBe(false)
    })
  })
})
