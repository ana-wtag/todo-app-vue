<template>
    <section class="container">
      <div class="section-head">
        <h4>{{ $t("Add Task") }}</h4>
      </div>
      <div class="btn-area">
        <button @click="showForm = true">{{ $t("Create") }}</button>
        <div class="filter-area">
            <button>{{ $t("All") }}</button>
            <button>{{ $t("Incomplete") }}</button>
            <button>{{ $t("Complete") }}</button>
        </div>
      </div>
      <div class="task-area">
        <div class="card" v-if="showForm">
            <textarea v-model="todoText"></textarea>
            <div class="card-footer">
                <button @click="addTask"> {{ $t("Add Task") }} </button>
                <span class="delete-icon">
                    <img :src="deleteIcon" />
                </span> 
            </div>
        </div>
        <Todo
            v-for="todo in todoList"
            :key="todo.id"
            :todoItem="todo"
        />
      </div>
      
    </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
    layout: 'default',
    computed: {
        ...mapState('todo', [
            'todoList'
        ])
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
            todoText: '',
            deleteIcon: require('@/assets/img/delete.svg')
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
