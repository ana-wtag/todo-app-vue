export const state = () => ({
    todoList: [],
    taskId: 0
  })
  
  export const mutations = {
    addTask(state, task) {
      state.taskId++
      state.todoList.push({
        id: state.taskId,
        text: task.text,
        done: task.done,
        createdAt: task.createdAt,
        markDoneAt: task.markDoneAt,
        completedIn: task.completedIn
      })
    },
    removeTask(state, taskId) {
      const task = state.getters.getTaskById(taskId)
      state.todoList.splice(state.todoList.indexOf(task), 1)
    },
    markDone(state, taskId) {
      const task = state.getters.getTaskById(taskId)
      task.done = true
    },
    editTask(state, updatedTask) {
      const task = state.getters.getTaskById(task.id)
      state.todoList.splice(state.list.indexOf(task), 1, updatedTask)
    }
  }

  export const getters = {
    getTaskById(state, taskId) {
      return state.todoList.find(item => item.id === taskId)
    },
    getCompletedTaskList(state) {
      return state.todoList.filter(item => item.done === true)
    },
    getIncompletedTaskList(state) {
      return state.todoList.filter(item => item.done === false)
    }
  }