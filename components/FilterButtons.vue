<template>
  <div>
    <button @click="showAll" :class="{ 'is-active': isAll }">{{ $t("All") }}</button>
    <button @click="showIncomplete" :class="{ 'is-active': isIncomplete }">{{ $t("Incomplete") }}</button>
    <button @click="showComplete" :class="{ 'is-active': isComplete }">{{ $t("Complete") }}</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isAll: true,
      isComplete: false,
      isIncomplete: false
    }
  },
  methods: {
    showAll() {
      this.isAll = true
      this.isComplete = false
      this.isIncomplete = false
      this.$store.dispatch("todo/setAllFilter")
    },
    showIncomplete() {
      this.isAll = false
      this.isComplete = false
      this.isIncomplete = true
      this.$store.dispatch("todo/setIncompleteFilter")
    },
    showComplete() {
      this.isAll = false
      this.isComplete = true
      this.isIncomplete = false
      this.$store.dispatch("todo/setCompleteFilter")
    }
  },
  created() {
    this.$store.dispatch("todo/setAllFilter")
  }
};
</script>

<style lang="scss" scoped>
.is-active {
  background: green;
}
</style>
