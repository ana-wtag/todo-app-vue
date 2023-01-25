import { v4 as uuidv4 } from 'uuid'
export const state = () => ({
    todoList: [],
    taskId: ''
  })

  export const actions = {
    addTask({commit}, task) {
      commit('incrementTaskId')
      commit('addTask', task)
    },
    removeTask({commit}, task) {
      commit('removeTask', task)
    },
    markDone({commit, getters}, task) {
      const item = getters.getTaskById(task.id)
      const completedIn = task.completedIn
      commit('markDone', {item, completedIn})
    }
  }
  
  export const mutations = {
    addTask(state, task) {
      state.todoList.push({
        id: state.taskId,
        text: task.text,
        done: task.done,
        createdAt: task.createdAt,
        completedIn: task.completedIn
      })
    },
    incrementTaskId(state) {
      state.taskId = uuidv4()
    },
    removeTask(state, task) {
      state.todoList.splice(state.todoList.indexOf(task), 1)
    },
    markDone(state, {item, completedIn}) {
      item.done = true
      item.completedIn = completedIn
    },
    
  }

  export const getters = {
    getTaskById: (state) => (taskId) => {
      return state.todoList.find(item => item.id === taskId)
    },
    getCompletedTaskList(state) {
      return state.todoList.filter(item => item.done === true)
    },
    getIncompletedTaskList(state) {
      return state.todoList.filter(item => item.done === false)
    }
  }