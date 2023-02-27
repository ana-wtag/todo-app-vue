<template>
  <div class="filter-wrapper">
    <div class="filter-btns">
      <button
        @click="showAll"
        :class="{ 'is-active': currentFilter === constants.ALL }"
      >
        {{ $t("general.all") }}
      </button>
      <button
        @click="showIncomplete"
        :class="{ 'is-active': currentFilter === constants.INCOMPLETE }"
      >
        {{ $t("general.incomplete") }}
      </button>
      <button
        @click="showComplete"
        :class="{ 'is-active': currentFilter === constants.COMPLETE }"
      >
        {{ $t("general.complete") }}
      </button>
    </div>
    <div class="select">
      <select @change="swicthFilter">
        <option
          :selected="currentFilter === constants.ALL"
          :value="constants.ALL"
        >
          {{ $t("general.all") }}
        </option>
        <option
          :selected="currentFilter === constants.INCOMPLETE"
          :value="constants.INCOMPLETE"
        >
          {{ $t("general.incomplete") }}
        </option>
        <option
          :selected="currentFilter === constants.COMPLETE"
          :value="constants.COMPLETE"
        >
          {{ $t("general.complete") }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import constants from "@/plugins/constants";
export default {
  data() {
    return {
      constants: constants,
    };
  },
  computed: {
    ...mapState("todo", ["currentFilter"]),
  },
  methods: {
    swicthFilter(event) {
      this.$store.dispatch("todo/setCurrentFilter", event.target.value)
    },
    showAll() {
      this.$store.dispatch("todo/setCurrentFilter", constants.ALL);
    },
    showIncomplete() {
      this.$store.dispatch("todo/setCurrentFilter", constants.INCOMPLETE);
    },
    showComplete() {
      this.$store.dispatch("todo/setCurrentFilter", constants.COMPLETE);
    },
  },
};
</script>

<style lang="scss" scoped>
.is-active {
  background: #7a8dfd !important;
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
.filter-wrapper {
  .select {
    display: none;
  }
  select {
    padding: 8px 10px;
  }
}

@media only screen and (max-width: 769px) {
  .filter-area button {
    padding: 8px 8px;
  }
}

// mobile scren

@media only screen and (max-width: 481px) {
  .filter-area button {
    padding: 8px 10px;
    font-size: 14px;
  }
}
@media only screen and (max-width: 321px) {
  .filter-wrapper .select {
    display: block;
  }
  .filter-btns {
    display: none;
  }
}
</style>
