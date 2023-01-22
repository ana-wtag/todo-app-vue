<template>
    <section class="container">
      <div class="section-head">
        <h4>Add Task</h4>
      </div>
      <div class="btn-area">
        <button @click="showForm = true">Create</button>
        <div class="filter-area">
            <button>All</button>
            <button>Incomplete</button>
            <button>Complete</button>
        </div>
      </div>
      <div class="task-area">
        <div class="card" v-if="showForm">
            <textarea v-model="todoText"></textarea>
            <div class="card-footer">
                <button @click="addTask"> Add Task </button>
                <span class="delete-icon">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="none"
                    >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17 24H3C1.896 24 1 23.104 1 22V6H19V22C19 23.104 18.104 24 17 24ZM8 10C8 9.448 7.552 9 7 9C6.448 9 6 9.448 6 10V19C6 19.552 6.448 20 7 20C7.552 20 8 19.552 8 19V10ZM14 10C14 9.448 13.552 9 13 9C12.448 9 12 9.448 12 10V19C12 19.552 12.448 20 13 20C13.552 20 14 19.552 14 19V10ZM20 5H0V3H6V1.5C6 0.673 6.673 0 7.5 0H12.5C13.325 0 14 0.671 14 1.5V3H20V5ZM8 3H12V2H8V3Z"
                        fill="#BBBDD0"
                    />
                    </svg>
                </span> 
            </div>
        </div>
        <todo
            v-for="todo in todoList"
            :key="todo.id"
            :todoItem="todo"
        />
      </div>
      
    </section>
</template>

<script>
export default {
    layout: 'default',
    computed: {
        todoList() {
            return this.$store.state.todo.todoList
        }
    },
    methods: {
        addTask() {
            if(!this.todoText) {
                return
            }
           const createdAt = new Date().toISOString().substring(0,10);
           const todo = {
            text: this.todoText,
            done: false,
            createdAt: createdAt,
            completedIn: null
           }
           
           this.$store.commit('todo/addTask', todo)
           this.todoText = ''
           this.showForm = false
        }
    },
    data() {
        return{
            showForm: false,
            todoText: ''
        }
    }
};
</script>

<style lang="scss" scoped>
    .btn-area {
        display: flex;
        justify-content: space-between;
    }
    .task-list{
        display: flex;
    }
    .task-area{
        display: flex;
    }
</style>
