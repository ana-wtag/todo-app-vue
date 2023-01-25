<template>
  <div class="card" v-if="showForm">
    <textarea v-model="todoText"></textarea>
    <div class="card-footer">
      <button @click="addTask">{{ $t("Add Task") }}</button>
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
      deleteIcon: require("@/assets/img/delete.svg"),
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
        return;
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
    },
    clearField() {
      this.todoText = "";
      this.$emit('toggleForm', false)
    }
  }
}
</script>
