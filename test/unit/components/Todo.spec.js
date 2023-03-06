import { describe, expect, it } from "@jest/globals";
import { shallowMount } from "@vue/test-utils";
import Todo from "@/components/Todo";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import { todo } from "@/test/utils/storeHelper";
import i18Mock from "~/test/utils/i18nMock";
import localVue from "~/test/utils/vueInstanceFactory";
import TickIcon from "@/assets/img/tick.svg";
import PencilIcon from "@/assets/img/pencil.svg";
import CardLoader from "@/components/CardLoader";

let store;

const i18n = new VueI18n({
  locale: "en",
  messages: i18Mock,
});

beforeEach(() => {
  store = new Vuex.Store({
    modules: {
      todo,
    },
  });
});

const wrapperFactory = (additionalData) => {
  const mounted = shallowMount(Todo, {
    localVue,
    i18n,
    store,
    propsData: {
        todoItem: {
            completedIn: null,
            createdAt: new Date(),
            done:false,
            id:"c4f73cdc-4490-4225-bba0-1633620995f8",
            loading:true,
            text:"test"
        },
      },
      data: function () {
        return {
            isEdit: true,
            taskText: "test",
        }
      },
    ...additionalData,
  });
  return mounted;
};

describe("@/components/Todo", () => {
  it("Show CardLoader when loading is true", () => {
    const wrapper = wrapperFactory();
    expect(wrapper.findComponent(CardLoader).exists()).toBe(true);
  });
  it("@/assets/img/tick.svg", () => {
    const wrapper = wrapperFactory();
    expect(wrapper.findComponent(TickIcon).exists()).toBe(true);
  });
  describe("Vuex Action calls", () => {
    it("Calls todo/editTask when task title is edited", async () => {
      const wrapper = await wrapperFactory(
            {
            id: "c4f73cdc-4490-4225-bba0-1633620995f8",
            updatedText: "Test",
          }
      );
      const saveEditedTaskButton = wrapper.find('[data-testid="save-edit-task"]');
      await saveEditedTaskButton.trigger("click");
      
      expect(todo.actions.editTask).toHaveBeenCalled()
    });
  });
});
