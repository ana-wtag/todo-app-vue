<template>
  <section>
    <div class="section-head">
      <h4>{{ $t("task.add") }}</h4>
    </div>
    <div class="btn-area">
      <button @click="showForm">{{ $t("task.create") }}</button>
      <div class="filter-area">
        <FilterButtons />
      </div>
    </div>
      <TaskWrapper />
  </section>
</template>

<script>

export default {
  layout: "default",
  methods: {
    showForm() {
      this.$store.dispatch("todo/showForm", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-area {
  display: flex;
  justify-content: space-between;
}

</style>
