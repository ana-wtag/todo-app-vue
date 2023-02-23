<template>
  <section class="wrapper">
    <header>
      <NavBar class="container" />
    </header>
    <main class="container">
      <Nuxt />
    </main>
  </section>
</template>

<script>
export default {};
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
