import { describe, expect, it } from "@jest/globals";
import { shallowMount } from "@vue/test-utils";
import TaskWrapper from "@/components/TaskWrapper";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import { todo } from "@/test/utils/storeHelper";
import i18Mock from "~/test/utils/i18nMock";
import localVue from "~/test/utils/vueInstanceFactory";
import AddTaskCard from "@/components/AddTaskCard";
import Todo from "@/components/Todo";

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
  const mounted = shallowMount(TaskWrapper, {
    localVue,
    i18n,
    store,
    ...additionalData,
    computed: {
        paginatedList: () => [{
            completedIn:null,
            createdAt:new Date(),
            done:false,
            id:"c4f73cdc-4490-4225-bba0-1633620995f8",
            loading:false,
            text:"test"

        }],
    },
  });
  return mounted;
};

describe("@/components/TaskWrapper", () => {
  it("@/assets/img/add-files.svg", () => {
    const wrapper = wrapperFactory();
    const emptyPlaceHolder = wrapper.find("empty-task-placeholder")
    expect(emptyPlaceHolder.exists()).toBe(false);
  });
  it("@/components/AddTaskCard", () => {
    const wrapper = wrapperFactory();
    expect(wrapper.findComponent(AddTaskCard).exists()).toBe(true);
  });
  it("@/components/Todo", async () => {
    const wrapper = wrapperFactory();
    expect(wrapper.findComponent(Todo).exists()).toBe(true);
  });
});
