import { v4 as uuidv4 } from "uuid";
export const state = () => ({
  todoList: [],
  taskId: "",
  loading: false,
});

export const actions = {
  addTask({ commit }, task) {
    commit("incrementTaskId");
    setTimeout(() => {
      commit("toggleLoad");
      commit("addTask", task);
    }, 1000);
    commit("toggleLoad");
  },
  removeTask({ getters, commit }, task) {
    commit("removeTask", task);
  },
};

export const mutations = {
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
  toggleLoad(state) {
    state.loading = !state.loading;
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
