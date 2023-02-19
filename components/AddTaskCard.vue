<template>
  <div class="card" v-if="showForm">
    <CardLoader v-if="loading" />
    <textarea v-model="todoText"></textarea>
    <div class="card-footer">
      <button @click="addTask" :style="{ 'margin-right': '19px' }">{{ $t("task.add") }}</button>
      <DeleteIcon class="delete-icon" @click="clearField" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DeleteIcon from "@/assets/img/delete.svg?inline";
import swal from "sweetalert";

export default {
  components: {
    DeleteIcon,
  },
  data() {
    return {
      todoText: "",
    };
  },
  computed: {
    ...mapState("todo", ["loading", "showForm"]),
  },
  props: {},
  methods: {
    showAlert(text, classNm) {
      swal(text, {
        buttons: false,
        timer: 3000,
        background: '#E85F5F',
        className: classNm,
      });
    },
    async addTask() {
      if (!this.todoText) {
        this.showAlert("Title is required!", "error");
        return;
      }
      const createdAt = new Date();
      const todo = {
        text: this.todoText,
        done: false,
        createdAt: createdAt,
        completedIn: null,
      };
      await this.$store.dispatch("todo/addTask", todo);
      this.showAlert("Changes are saved successfully", "success");
      this.todoText = "";
    },
    clearField() {
      this.todoText = "";
      this.$store.dispatch("todo/showForm", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-footer {
  bottom: 14px;
  justify-content: flex-start;
}

</style>
