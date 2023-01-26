<template>
  <div class="card" v-if="showForm">
    <CardLoader v-if="loading"/>
    <textarea v-model="todoText"></textarea>
    <div class="error-msg" v-if="showError">{{ $t("Title is required!") }}</div>
    <div class="card-footer">
      <button @click="addTask" class="mr-19">{{ $t("Add Task") }}</button>
      <span class="delete-icon" @click="clearField">
        <img :src="deleteIcon" />
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
    return {
      todoText: "",
      showError: false,
      deleteIcon: require("@/assets/img/delete.svg")
    };
  },
  computed: {
    ...mapState("todo", ["loading"])
  },
  props: {
    showForm: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    addTask() {
      if (!this.todoText) {
        this.showError = true
        return
      }
      const createdAt = new Date()
      const todo = {
        text: this.todoText,
        done: false,
        createdAt: createdAt,
        completedIn: null,
      };
      this.$store.dispatch("todo/addTask", todo);
      this.todoText = "";
      this.showError = false
    },
    clearField() {
      this.todoText = "";
      this.$emit('toggleForm', false)
      this.showError = false
    }
  }
}
</script>

<style lang="scss" scoped>
.card-footer {
  bottom: 14px;
}
</style>
