<template>
  <nav>
    <div class="nav-left">
      <div class="logo">
        <img :src="logo" />
        <span>Todos</span>
      </div>
    </div>
    <div class="nav-right">
      <input type="text" @keyup="search" v-model="searchText" />
      <!-- for search -->
      <span class="search-icon">
        <img :src="searchIcon" />
      </span>
      <select @change="switchLanguage">
        <option
          :selected="item.code === $i18n.defaultLocale"
          v-for="item in $i18n.locales"
          :key="item.code"
          :value="item.code"
        >
          {{ item.name }}
        </option>
      </select>
    </div>
  </nav>
</template>

<script>
import debounce from "@/helpers/debounce";
export default {
  data() {
    return {
      searchText: "",
      //searchTimeout: "",
      logo: require("@/assets/img/leaf.svg"),
      searchIcon: require("@/assets/img/search.svg"),
    };
  },
  methods: {
    search(event) {
      this.debouncedSearch(event.target.value);
    },

    debouncedSearch: debounce(function (value) {
      this.$store.dispatch("todo/search", value);
    }, 300),

    switchLanguage(event) {
      this.$i18n.setLocale(event.target.value);
    },
  },
};
</script>

<style scoped>
nav,
.nav-right {
  display: flex;
  justify-content: space-between;
}
</style>
