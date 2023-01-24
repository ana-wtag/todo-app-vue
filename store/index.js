export const state = () => ({
    showForm: false
  })
  
  export const mutations = {
    toggleForm(state, status) {
        state.showForm = status
    }
  }
 