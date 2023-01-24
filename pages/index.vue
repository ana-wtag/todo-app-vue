<template>
  <section class="container">
    <div class="section-head">
      <h4>{{ $t("Add Task") }}</h4>
    </div>
    <div class="btn-area">
      <button @click="renderForm">{{ $t("Create") }}</button>
      <div class="filter-area">
        <FilterButtons />
      </div>
    </div>
    <div class="task-area">
      <AddTaskCard />
      <ToDo v-for="todo in todoList" :key="todo.id" :todoItem="todo" />
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  layout: "default",
  computed: {
    ...mapState("todo", ["todoList"]),
    ...mapMutations(["toggleForm"])
  },
  methods: {
    renderForm() {
        this.$store.commit('toggleForm', true)
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
}
</style>
