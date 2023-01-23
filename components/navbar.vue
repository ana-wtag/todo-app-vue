<template>
  <nav>
    <div class="nav-left">
      <div class="logo">
        <img :src="logo" />
        <span>Todos</span>
      </div>
    </div>
    <div class="nav-right">
      <input type="text" />  <!-- for search -->
      <span class="search-icon">
        <img :src="searchIcon" />
      </span>
      <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      logo: require('@/assets/img/leaf.svg'),
      searchIcon: require('@/assets/img/search.svg'),
    }
  }
};
</script>

<style lang="scss" scoped></style>
