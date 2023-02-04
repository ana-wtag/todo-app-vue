import { v4 as uuidv4 } from "uuid";
export const state = () => ({
  todoList: [],
  taskId: "",
  loading: false,
  limit: 3,
  showForm: false,
  currentFilter: "All",
  searchLoading: false,
  searchText: ""
});

export const actions = {
  toggleSearchLoad({ commit }) {
    commit('toggleSearchLoad')
  },
  search({ commit }, searchText) {
    commit('setSearchText', searchText)
  },
  setCurrentFilter({ commit }, filter) {
    commit("setCurrentFilter", filter)
  },

  addTask({ commit }, task) {
    commit("incrementTaskId");
    setTimeout(() => {
      commit("toggleLoad");
      commit("addTask", task);
    }, 800);
    commit("toggleLoad");
  },
  editTask({ commit, getters }, task) {
    const item = getters.getTaskById(task.id);
    setTimeout(() => {
      commit("toggleTaskLoad", item);
      commit("editTask", { item, task });
    }, 800);
    commit("toggleTaskLoad", item);
  },
  removeTask({ commit }, task) {
    commit("removeTask", task);
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
    state.todoList.push({
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
