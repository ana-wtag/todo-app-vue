<template>
  <div class="loader-overlay">
    <LoaderIcon class="loader-icon"/>
  </div>
</template>

<script>
import LoaderIcon from "@/assets/img/loader.svg"
export default {
  components: {
    LoaderIcon
  },
  data() {
    return {
      
    };
  },
};
</script>

<style lang="scss" scoped>
.loader-overlay {
    background: rgba(255,255,255,0.3);
    z-index: 999;
    height: 100%;
    width: 100%;
    top:0%;
    left:0%;
}
.loader-overlay, .loader-overlay .loader-icon{
    position: absolute;
}
.loader-overlay .loader-icon{
    top: 50%;
    left: 50%;
    -webkit-animation:spin 4s linear infinite;
    -moz-animation:spin 4s linear infinite;
    translate:-50% -50%;
    animation:spin 4s linear infinite;
}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
