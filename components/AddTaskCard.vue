<template>
  <div class="card" v-if="showForm">
    <CardLoader v-if="loading" />
    <textarea v-model="todoText" data-testid="task-title-input"></textarea>
    <div class="card-footer">
      <button @click="addTask" :style="{ 'margin-right': '19px' }" data-testid="add-task-button">
        {{ $t("task.add") }}
      </button>
      <DeleteIcon class="delete-icon" @click="clearField" data-testid="delete-task-form"/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DeleteIcon from "@/assets/img/delete.svg";
import swal from "sweetalert";
import constants from "@/plugins/constants";

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
        className: classNm,
      });
    },
    validate() {
      if (!this.todoText) {
        this.showAlert(`${this.$t("validation.title.required")}`, "error");
        return false;
      }
      const sanitizedInput = this.todoText.replace(/<[^>]+>/g, '');
      this.todoText = sanitizedInput;
      return true;
    },
    async addTask() {
      if (this.validate()) {
        const createdAt = new Date();
        const todo = {
          text: this.todoText,
          done: false,
          createdAt: createdAt,
          completedIn: null,
        };
        await this.$store.dispatch("todo/addTask", todo);
        this.showAlert(`${this.$t("validation.save.success")}`, "success");
        this.$store.dispatch("todo/resetSearch", "");
        this.$store.dispatch("todo/setCurrentFilter", constants.ALL);
        this.todoText = "";
      }
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
/** Responsive Design **/
// tablet screen
@media only screen and (max-width: 769px) {
}

// mobile scren
@media only screen and (max-width: 426px) {
}
</style>
