<template>
  <nav>
    <div class="nav-left">
      <div class="logo">
        <img :src="logo" />
        <span>Todos</span>
      </div>
    </div>
    <div class="nav-right">
      <Transition>
        <input type="text" v-model="searchKey" v-if="showSearchField" />
      </Transition>
      <!-- for search -->
      <span class="search-icon" @click="onSearchIconClick">
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      showSearchField: false,
      logo: require("@/assets/img/leaf.svg"),
      searchIcon: require("@/assets/img/search.svg"),
    };
  },
  computed: {
    ...mapState("todo", ["searchText"]),
    searchKey: {
      get() {
        return this.searchText;
      },
      set(newValue) {
        this.debouncedSearch(newValue);
      },
    },
  },
  methods: {
    onSearchIconClick() {
      this.showSearchField = !this.showSearchField;
      this.$store.dispatch("todo/resetSearch", "");
    },
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

<style lang="scss" scoped>
.nav-right {
  display: flex;
  justify-content: flex-end;
  width: 50%;
}

.nav-right input,
.nav-right span {
  margin-right: 19px;
}
.nav-right input {
  width: 50%;
  border-radius: 5px;
  border: 3px solid #d1d8ff;
}

.nav-right select {
  border-radius: 5px;
  border: 3px solid #d1d8ff;
}
nav {
  height: 72px;
  display: flex;
  justify-content: space-between;
}

.logo span {
  font-size: 36px;
  font-weight: 700;
  color: #7a8dfd;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/** Responsive Design **/
// tablet screen
@media only screen and (max-width: 769px) {
  .logo span {
    font-size: 25px;
  }
}

// mobile scren
@media only screen and (max-width: 426px) {
  .nav-right input,
  .nav-right span {
    margin-right: 2px;
  }
  .nav-right {
    width: 100%;
  }
  .logo span {
    display: none;
  }
}

@media only screen and (max-width: 426px) {
}
</style>
