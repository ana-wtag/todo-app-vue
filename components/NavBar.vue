<template>
  <nav>
    <div class="nav-left">
      <div class="logo">
        <img :src="logo" />
        <span>Todos</span>
      </div>
    </div>
    <div class="nav-right">
      <input type="text" />
      <!-- for search -->
      <span class="search-icon">
        <img :src="searchIcon" />
      </span>
      <select @change="switchLanguage">
        <option  :selected="item.code === $i18n.defaultLocale" v-for="item in $i18n.locales" :key="item.code" :value="item.code">{{ item.name }}</option>
      </select>
    </div> 
  </nav>
</template>

<script>
export default {
  data() {
    return {
      logo: require("@/assets/img/leaf.svg"),
      searchIcon: require("@/assets/img/search.svg"),
    };
  },
  methods: {
    switchLanguage(event) {
      this.$i18n.setLocale(event.target.value)
    }
  }
};
</script>

<style lang="scss" scoped></style>
