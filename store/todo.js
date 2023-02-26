import { v4 as uuidv4 } from "uuid";
import constants from '@/plugins/constants';

export const state = () => ({
  todoList: [],
  taskId: "",
  loading: false,
  limit: constants.LIMIT,
  showForm: false,
  searchLoading: false,
  searchText: "",
  currentFilter: constants.ALL
});

export const actions = {
  toggleSearchLoad({ commit }) {
    commit('toggleSearchLoad')
  },
  resetSearch({ commit }, searchText) {
    commit('setSearchText', searchText)
  },
  search({ commit }, searchText) {
    setTimeout(() => {
      commit('toggleSearchLoad')
      commit('setSearchText', searchText)
    }, 800);
    commit('toggleSearchLoad')
  },
  setCurrentFilter({ commit }, filter) {
    commit("setCurrentFilter", filter)
  },
  addTask({ commit }, task) {
    return new Promise((resolve, reject) => {
      commit("incrementTaskId")
      commit("toggleLoad")
      setTimeout(() => {
        commit("addTask", task)
        commit("toggleLoad")
        resolve()
      }, constants.TIMER);
    })
  },
  editTask({ commit, getters }, task) {
    const item = getters.getTaskById(task.id);
    setTimeout(() => {
      commit("toggleTaskLoad", item);
      commit("editTask", { item, task });
    }, constants.TIMER);
    commit("toggleTaskLoad", item);
  },

  removeTask({ commit }, task) {
    return new Promise((resolve, reject) => {
      commit("toggleTaskLoad", task)
      setTimeout(() => {
        commit("removeTask", task);
        commit("toggleTaskLoad", task)
        resolve()
      }, 800);
    })
  },
  showForm({ commit }, value) {
    commit("showForm", value);
  },
  markDone({ commit, getters }, task) {
    const item = getters.getTaskById(task.id);
    commit("markDone", { item, task });
  },
};

export const mutations = {
  toggleSearchLoad(state) {
    state.searchLoading = !state.searchLoading
  },
  setSearchText(state, text) {
    state.searchText = text
  },
  setCurrentFilter(state, filter) {
    state.currentFilter = filter
  },
  addTask(state, task) {
    state.todoList.unshift({
      id: state.taskId,
      text: task.text,
      done: task.done,
      createdAt: task.createdAt,
      completedIn: task.completedIn,
      loading: false,
    });
  },
  incrementTaskId(state) {
    state.taskId = uuidv4();
  },
  removeTask(state, task) {
    state.todoList.splice(state.todoList.indexOf(task), 1);
  },
  markDone(state, { item, task }) {
    item.done = true;
    item.completedIn = task.completedIn;
  },
  editTask(state, { item, task }) {
    item.text = task.updatedText;
  },
  showForm(state, value) {
    state.showForm = value;
  },
  toggleLoad(state) {
    state.loading = !state.loading;
  },
  toggleTaskLoad(state, item) {
    item.loading = !item.loading;
  },

};

export const getters = {
  getTaskById: (state) => (taskId) => {
    return state.todoList.find((item) => item.id === taskId);
  },
  getCompletedTaskList(state) {
    return state.todoList.filter((item) => item.done === true);
  },
  getIncompletedTaskList(state) {
    return state.todoList.filter((item) => item.done === false);
  },
};
