<template>
  <div>
    <button
      @click="showAll"
      :class="{ 'is-active': currentFilter === filters.ALL }"
    >
      {{ $t("general.all") }}
    </button>
    <button
      @click="showIncomplete"
      :class="{ 'is-active': currentFilter === filters.INCOMPLETE }"
    >
      {{ $t("general.incomplete") }}
    </button>
    <button
      @click="showComplete"
      :class="{ 'is-active': currentFilter === filters.COMPLETE }"
    >
      {{ $t("general.complete") }}
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import filters from "@/plugins/constants";
export default {
  data() {
    return {
      filters: filters,
    };
  },
  computed: {
    ...mapState("todo", ["currentFilter"]),
  },
  methods: {
    showAll() {
      this.$store.dispatch("todo/setCurrentFilter", filters.ALL);
    },
    showIncomplete() {
      this.$store.dispatch("todo/setCurrentFilter", filters.INCOMPLETE);
    },
    showComplete() {
      this.$store.dispatch("todo/setCurrentFilter", filters.COMPLETE);
    },
  },
};
</script>

<style lang="scss" scoped>
.is-active {
  background: #7A8DFD !important;
  color: white;
}

.filter-area button {
font-size: 16px;
font-weight: 500;
padding: 8px 15px;
border: 1px solid #dde2ff;
border-radius: 5px;
background: white;
}
</style>
