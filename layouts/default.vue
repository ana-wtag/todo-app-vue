<template>
  <section class="wrapper">
    <SplashScreen v-if="loadSplashScreen"/>
    <template v-else>
      <header>
      <NavBar class="container" />
    </header>
    <main class="container">
      <Nuxt />
    </main>
    </template>
    
  </section>
</template>

<script>
import SplashScreen from '@/components/SplashScreen.vue'
export default {
  components: {
    SplashScreen,
  },
  data() {
    return {
      loadSplashScreen: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.loadSplashScreen = false
    }, 1000)
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  background: #f8f9ff;
}
header {
  background: #ffffff;
  border: 1px solid #dde2ff;
}
</style>
