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
    ...mapState("todo", ["limit","currentFilter", "todoList", "searchText"]),
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
        return `${this.$t("Load")} ${this.$t("More")}`;
      } else if (this.isShowLessState) {
        return `${this.$t("Show")} ${this.$t("Less")}`;
      } else {
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
