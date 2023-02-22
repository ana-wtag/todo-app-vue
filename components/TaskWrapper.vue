<template>
  <section class="task-container">
    <div class="task-area">
      <AddTaskCard />
      <template v-if="todoList.length > 0">
        <Todo v-for="todo in paginatedList" :key="todo.id" :todoItem="todo" />
      </template>
      <template v-else>
        <EmptyTaskPlaceholder class="empty-task-placeholder" />
        <div class="empty-task-placeholder-text">
          {{ $t("task.emptyText") }}
        </div>
      </template>
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
import EmptyTaskPlaceholder from "@/assets/img/add-files.svg?inline";
export default {
  components: {
    EmptyTaskPlaceholder,
  },
  data() {
    return {
      firstIndex: 0,
      lastIndex: 0,
    };
  },
  computed: {
    ...mapState("todo", [
      "limit",
      "currentFilter",
      "todoList",
      "searchText",
      "searchLoading",
    ]),
    ...mapGetters("todo", ["getCompletedTaskList", "getIncompletedTaskList"]),
    list() {
      if (this.searchText) {
        return this.paginatedCurrentFilter.filter((item) =>
          item.text.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }
      return this.paginatedCurrentFilter;
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
  watch: {
    currentFilter() {
      this.lastIndex = this.limit;
    },
  },
  methods: {
    onLoadBtnClick() {
      if (this.isLoadMoreState) {
        this.lastIndex = Math.min(
          this.lastIndex + this.limit,
          this.list.length
        );
        return;
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
  justify-content: flex-start;
}
.load-btn {
  text-align: center;
  margin-top: 66px;
}
.load-btn button {
  height: 36px;
  width: 117px;
  background: #32394b;
  border: 1px solid #dde2ff;
  border-radius: 5px;
  color: white;
}
.empty-task-placeholder,
.empty-task-placeholder-text {
  position: absolute;
  //top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 50vh;
}
.empty-task-placeholder-text {
  //top: 65%;
  font-weight: 700px;
  font-size: 24px;
  margin-top: 55vh;
}
</style>
