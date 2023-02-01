<template>
  <div>
    <button @click="onLoadBtnClick">{{ btnText }}</button>
  </div>
</template>

<script>
export default {
  props: {
    showLess: {
      required: true,
      type: Boolean
    },
    loadMore: {
      required: true,
      type: Boolean
    }
  },
  computed: {
    btnText() {
      if (this.loadMore) {
        return "Load More";
      } else if (this.showLess) {
        return "Show Less";
      } else {
        return "";
      }
  }
},
methods: {
  onLoadBtnClick () {
    if (this.loadMore) {
      this.firstIndex = this.lastIndex
      if((this.lastIndex + this.limit) >= this.todoList.length) {
        this.lastIndex = this.todoList.length
      } else {
        this.lastIndex = this.lastIndex + this.limit
      }

    } else {
      //this.computedList = this.todoList.slice();
    }
  }
}
};
</script>

<style lang="scss" scoped></style>
