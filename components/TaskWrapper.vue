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
import { mapState } from "vuex";
export default {
  data() {
    return {
      firstIndex: 0,
      lastIndex: 0,
    };
  },
  computed: {
    ...mapState("todo", ["currentFilter", "limit"]),
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
      return this.currentFilter.length > this.paginatedList.length;
    },
    isShowLessState() {
      return this.paginatedList.length > this.limit;
    },
    paginatedList() {
      return this.currentFilter.length > 0
        ? this.currentFilter.slice(this.firstIndex, this.lastIndex)
        : [];
    },
  },
  methods: {
    onLoadBtnClick() {
      if (this.isLoadMoreState) {
        this.lastIndex = Math.min(
          this.lastIndex + this.limit,
          this.currentFilter.length
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
