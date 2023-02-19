<template>
  <section>
    <div class="section-head">
      <h4>{{ $t("task.add") }}</h4>
    </div>
    <div class="section-body">
      <CardLoader v-if="searchLoading" />
      <div class="btn-area">
        <button @click="showCreateForm" class="create-btn">
          <span>{{ $t("task.create") }}</span>
        </button>
        <div class="filter-area">
          <FilterButtons />
        </div>
      </div>
      <TaskWrapper />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  layout: "default",
  computed: {
    ...mapState("todo", ["searchLoading", "todoList"]),
  },
  methods: {
    showCreateForm() {
      this.$store.dispatch("todo/showForm", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.section-body {
  position: relative;
  height: 100vh;
}

.section-head h4 {
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 35px;
}
.btn-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .create-btn {
    height: 36px;
    width: 104px;
    border-radius: 5px;
    border: none;
    background: #7a8dfd;
    color: white;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    position: relative;

    span::after {
      content: "\002b";
      position: absolute;
      left: 13%;
      top: 22%;
    }
  }
}
</style>
