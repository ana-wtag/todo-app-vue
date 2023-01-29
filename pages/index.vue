<template>
    <section>
    <div class="section-head">
      <h4>{{ $t("Add Task") }}</h4>
    </div>
    <div class="btn-area">
      <button @click="showForm = true">{{ $t("Create") }}</button>
      <div class="filter-area">
        <FilterButtons />
      </div>
    </div>
    <div class="task-area">
      <AddTaskCard :showForm="showForm" @toggleForm="toggleForm"/>
      <Todo v-for="todo in list" :key="todo.id" :todoItem="todo" />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import lodash from "lodash";

export default {
  layout: "default",
  computed: {
    ...mapState("todo", ["todoList"]),
    list () {
      console.log(lodash.cloneDeep(this.todoList))
      return lodash.cloneDeep(this.todoList)
    }
  },
  data() {
    return {
      showForm: false
    }
  },
  methods: {
    toggleForm(value) {
      this.showForm = value
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-area {
  display: flex;
  justify-content: space-between;
}
.task-list {
  display: flex;
}
.task-area {
  display: flex;
  flex-wrap: wrap;
}
</style>
