import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import AddTaskCard from '@/components/AddTaskCard'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import { todo } from '@/test/utils/storeHelper'
import i18Mock from '~/test/utils/i18nMock'

let store

const todoText = "Test"

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

async function wrapperFactory(newState = {}) {
  const mounted = await mount(AddTaskCard, {
    store,
    i18n,
    data: function () {
      return {
        todoText
      }
    },

    stubs: ['DeleteIcon'],
  })

  return mounted
}

describe('@/components/AddTaskCard', () => {
  describe('Validation Checks', () => {
    it('Shows error when task title is not provided.', async () => {
      const wrapper = await wrapperFactory()

      const taskTitle = wrapper.find('[id="task-title-input"]')

      const addTaskButton = wrapper.find(
        '[id="add-task-button"]'
      )

      await taskTitle.setValue('')

      await addTaskButton.trigger('click')

      const showAlert = jest.spyOn(wrapper.vm, 'showAlert')
      expect(showAlert).toHaveBeenCalled()
    })
  })
})
