<template>
  <section>
    <div class="section-head">
      <h4>{{ $t("task.add") }}</h4>
    </div>
    <div class="section-body">
      <CardLoader v-if="searchLoading"/>
    <div class="btn-area">
      <button @click="showForm">{{ $t("task.create") }}</button>
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
    ...mapState("todo", ["searchLoading"]),
  },
  methods: {
    showForm() {
      this.$store.dispatch("todo/showForm", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.section-body {
  position: relative;
}
.btn-area {
  display: flex;
  justify-content: space-between;
}

</style>
