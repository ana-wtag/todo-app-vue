<template>
  <section>
    <div class="task-area">
      <AddTaskCard />
      <Todo v-for="todo in paginatedList" :key="todo.id" :todoItem="todo" />
    </div>

    <div class="load-btn">
      <button v-if="isLoadMoreState || isShowLessState" @click="onLoadBtnClick">
        {{ btnText }}
      </button>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import filters from '@/plugins/constants';
export default {
  data() {
    return {
      firstIndex: 0,
      lastIndex: 0,
    };
  },
  computed: {
    ...mapState("todo", ["limit","currentFilter", "todoList"]),
    ...mapGetters("todo", [
      'getCompletedTaskList',
      'getIncompletedTaskList'
    ]),
    paginatedCurrentFilter() {
      if(this.currentFilter === filters.ALL) {
        return this.todoList
      } else if(this.currentFilter === filters.INCOMPLETE) {
        return this.getIncompletedTaskList
      } else if(this.currentFilter === filters.COMPLETE) {
        return this.getCompletedTaskList
      } else {
        return []
      }
    },
    btnText() {
      if (this.isLoadMoreState) {
        return `${this.$t("general.load")} ${this.$t("general.more")}`;
      } else if (this.isShowLessState) {
        return `${this.$t("general.show")} ${this.$t("general.less")}`;
      } else {
        return "";
      }
    },
    isLoadMoreState() {
      return this.paginatedCurrentFilter.length > this.paginatedList.length;
    },
    isShowLessState() {
      return this.paginatedList.length > this.limit;
    },
    paginatedList() {
      return this.paginatedCurrentFilter.length > 0
        ? this.paginatedCurrentFilter.slice(this.firstIndex, this.lastIndex)
        : [];
    },
  },
  methods: {
    onLoadBtnClick() {
      if (this.isLoadMoreState) {
        this.lastIndex = Math.min(
          this.lastIndex + this.limit,
          this.paginatedCurrentFilter.length
        );
      } else if (this.isShowLessState) {
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
