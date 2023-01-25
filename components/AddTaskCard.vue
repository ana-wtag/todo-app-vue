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
import { mapState } from "vuex";
export default {
    data() {
    return {
      todoText: "",
      deleteIcon: require("@/assets/img/delete.svg"),
      
    };
  },
  computed: {
    ...mapState(["showForm"]),
  },
  methods: {
    addTask() {
      if (!this.todoText) {
        return;
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
      //this.$store.commit('toggleForm', false)
    },
    clearField() {
      this.todoText = "";
      this.$store.commit('toggleForm', false)
    },
  }
}
</script>
