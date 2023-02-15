<template>
  <div>
    <button @click="showAll" :class="{ 'is-active': currentFilter === filters.ALL }">{{ $t("general.all") }}</button>
    <button @click="showIncomplete" :class="{ 'is-active': currentFilter === filters.INCOMPLETE }">{{ $t("general.incomplete") }}</button>
    <button @click="showComplete" :class="{ 'is-active': currentFilter === filters.COMPLETE }">{{ $t("general.complete") }}</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import filters from '@/plugins/constants';
export default {
  data() {
    return {
      filters: filters
    }
  },
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
