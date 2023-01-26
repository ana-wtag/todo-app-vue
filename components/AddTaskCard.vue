<template>
  <div class="card" v-if="showForm">
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
export default {
    data() {
    return {
      todoText: "",
      showError: false,
      deleteIcon: require("@/assets/img/delete.svg")
    };
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
      const createdAt = new Date().toISOString().substring(0, 10);
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
