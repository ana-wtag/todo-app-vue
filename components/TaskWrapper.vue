<template>
  <section>
    <div class="task-area">
      <AddTaskCard />
      <Todo v-for="todo in computedList" :key="todo.id" :todoItem="todo" />
    </div>

    <div class="load-btn">
      <button v-if="loadMore || showLess" @click="onLoadBtnClick">
        {{ btnText }}
      </button>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      firstIndex: 0,
      lastIndex: 0,
    };
  },
  computed: {
    ...mapState("todo", ["todoList", "limit"]),
    btnText() {
      if (this.loadMore) {
        return "Load More";
      } else if (this.showLess) {
        return "Show Less";
      } else {
        return "";
      }
    },
    loadMore() {
      if (this.todoList.length > this.computedList.length) {
        return true;
      } else {
        return false;
      }
    },
    showLess() {
      if (this.computedList.length > this.limit) {
        return true;
      } else {
        return false;
      }
    },
    computedList() {
      if (this.todoList.length > 0) {
        return this.todoList.slice(this.firstIndex, this.lastIndex);
      } else {
        return [];
      }
    },
  },
  methods: {
    onLoadBtnClick() {
      if (this.loadMore) {
        if (this.lastIndex + this.limit >= this.todoList.length) {
          this.lastIndex = this.todoList.length;
        } else {
          this.lastIndex = this.lastIndex + this.limit;
        }
      } else if (this.showLess) {
        this.lastIndex = this.limit;
      }
    },
  },
  mounted() {
    this.lastIndex = this.limit;
  },
};
</script>

<style lang="scss" scoped>
.task-area {
  display: flex;
  flex-wrap: wrap;
}
</style>
