<template>
  <div>
    <button @click="showAll" :class="{ 'is-active': currentFilter === 'All' }">{{ $t("All") }}</button>
    <button @click="showIncomplete" :class="{ 'is-active': currentFilter === 'Incomplete' }">{{ $t("Incomplete") }}</button>
    <button @click="showComplete" :class="{ 'is-active': currentFilter === 'Complete' }">{{ $t("Complete") }}</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import filters from '@/plugins/constants';
export default {
  computed: {
    ...mapState("todo", ["currentFilter"])
  },
  methods: {
    showAll() {
      this.$store.dispatch("todo/setCurrentFilter", filters.ALL)
    },
    showIncomplete() {
      this.$store.dispatch("todo/setCurrentFilter", filters.INCOMPLETE)
    },
    showComplete() {
      this.$store.dispatch("todo/setCurrentFilter", filters.COMPLETE)
    }
  }
};
</script>

<style lang="scss" scoped>
.is-active {
  background: green;
}
</style>
