export const state = () => ({
    todoList: [],
    taskId: 0
  })

  export const actions = {
    addTask({commit}, task) {
      commit('incrementTaskId')
      commit('addTask', task)
    },
    removeTask({commit}, task) {
      commit('removeTask', task)
    },
    markDone({commit, getters}, taskId) {
      debugger
      const task = getters.getTaskById(taskId)
      commit('markDone', task)
    },
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
      state.taskId++
    },
    removeTask(state, task) {
      state.todoList.splice(state.todoList.indexOf(task), 1)
    },
    markDone(task) {
      task.done = true
    },
    // editTask(state, getters, updatedTask) {
    //   const task = getters.getTaskById(task.id)
    //   state.todoList.splice(state.list.indexOf(task), 1, updatedTask)
    // }
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