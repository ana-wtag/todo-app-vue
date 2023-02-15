<template>
  <section class="task-container">
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
import filters from "@/plugins/constants";
export default {
  data() {
    return {
      firstIndex: 0,
      lastIndex: 0,
    };
  },
  computed: {
    ...mapState("todo", ["limit","currentFilter", "todoList", "searchText","searchLoading"]),
    ...mapGetters("todo", [
      'getCompletedTaskList',
      'getIncompletedTaskList'
    ]),
    list() {
      if(this.searchText) {
        return this.paginatedCurrentFilter.filter(item => item.text.toLowerCase().includes(this.searchText.toLowerCase()))
      } else {
        return this.paginatedCurrentFilter
      }
    },
    paginatedCurrentFilter() {
      switch (this.currentFilter) {
        case filters.ALL:
          return this.todoList;
        case filters.INCOMPLETE:
          return this.getIncompletedTaskList;
        case filters.COMPLETE:
          return this.getCompletedTaskList;
        default:
          return [];
      }
    },
    btnText() {
      switch (true) {
        case this.isLoadMoreState:
          return `${this.$t("general.load")} ${this.$t("general.more")}`;
        case this.isShowLessState:
          return `${this.$t("general.show")} ${this.$t("general.less")}`;
        default:
          return "";
      }
    },
    isLoadMoreState() {
      return this.list.length > this.paginatedList.length;
    },
    isShowLessState() {
      return this.list.length > this.limit;
    },
    paginatedList() {
      return this.list.length > 0
        ? this.list.slice(this.firstIndex, this.lastIndex)
        : [];
    },
  },
  methods: {
    onLoadBtnClick() {
      if (this.isLoadMoreState) {
        this.lastIndex = Math.min(
          this.lastIndex + this.limit,
          this.list.length
        );
        return
      }
      if (this.isShowLessState) {
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
