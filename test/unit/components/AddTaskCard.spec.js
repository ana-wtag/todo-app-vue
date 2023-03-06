import { describe, expect, it } from "@jest/globals";
import { shallowMount } from "@vue/test-utils";
import AddTaskCard from "@/components/AddTaskCard";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import { todo } from "@/test/utils/storeHelper";
import i18Mock from "~/test/utils/i18nMock";
import localVue from "~/test/utils/vueInstanceFactory";
import DeleteIcon from "@/assets/img/delete.svg";

let store;

const todoData = {
  text: "Test",
  done: false,
  createdAt: new Date(),
  completedIn: null,
}

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
  const mounted = shallowMount(AddTaskCard, {
    localVue,
    i18n,
    store,
    computed: {
      showForm: () => true,
    },
    ...additionalData,
  });
  return mounted;
};

describe("@/components/AddTaskCard", () => {
  it("@/assets/img/delete.svg", () => {
    const wrapper = wrapperFactory();
    expect(wrapper.findComponent(DeleteIcon).exists()).toBe(true);
  });
  describe("Validation Checks", () => {
    it("validation returns false when task title is not provided.", async () => {
      const wrapper = wrapperFactory();

      const taskTitle = wrapper.find('[data-testid="task-title-input"]');

      const addTaskButton = wrapper.find('[data-testid="add-task-button"]');

      await taskTitle.setValue("");
      const validateFnMock = jest.spyOn(wrapper.vm, "validate");
      await addTaskButton.trigger("click");
      const response = validateFnMock();
      expect(response).toBe(false);
    });
  });
  describe("Vuex Action calls", () => {
    it("Calls todo/addTask when task title is added", async () => {
      const wrapper = await wrapperFactory({
        ...todoData
      });

      const taskTitle = wrapper.find('[data-testid="task-title-input"]');
      await taskTitle.setValue("Test");
      const addTaskButton = wrapper.find('[data-testid="add-task-button"]');
      await addTaskButton.trigger("click");
      
      expect(todo.actions.addTask).toHaveBeenCalled()
    });
  });
});
