<template>
  <div class="splash-screen">
    <div class="sp-wrapper">
      <img :src="logo" class="sp-logo" />
      <span class="project-title">{{ $t("todos") }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "SplashScreen",
  data() {
    return {
      logo: require("@/assets/img/leaf-lg.svg"),
    };
  },
};
</script>
<style lang="scss">
.splash-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #f8f9ff;
  animation: fade 2s linear;
}
.project-title {
  font-size: 96px;
  font-weight: 700;
  color: #7a8dfd;
  text-transform: capitalize;
  font-family: Roboto;
}
@keyframes fade {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

// mobile scren
@media only screen and (max-width: 426px) {
  .sp-wrapper {
    padding: 10%;
    text-align: center;
  }
}
</style>
