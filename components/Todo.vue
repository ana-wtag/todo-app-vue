<template>
  <div class="card">
    <CardLoader v-if="todoItem.loading" />
    <template v-if="isEdit">
      <textarea v-model="taskText"></textarea>
      <!-- <div class="error-msg" v-if="showError">
        {{ $t("Title is required!") }}
      </div> -->
    </template>
    <template v-else>
      <div class="card-header" :class="{ 'mark-done': todoItem.done }">
        {{ todoItem.text }}
      </div>
      <div class="card-subheader">
        <span>{{ createdTime }}</span>
      </div>
    </template>

    <div class="card-footer">
      <div class="card-footer-left">
        <button v-if="isEdit" @click="onSave" class="mr-19">
          {{ $t("task.save") }}
        </button>

        <template v-if="!todoItem.done">
          <span class="tick-icon mr-19" @click="markDone">
            <TickIcon />
          </span>
          <span class="pencil-icon mr-19" v-if="!isEdit" @click="editTask">
            <PencilIcon />
          </span>
        </template>

        <span class="delete-icon" @click="deleteTask">
          <DeleteIcon />
        </span>
      </div>
      <div class="card-footer-right">
        <span class="completed-badge" v-if="todoItem.done">{{
          completedTime
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDistance } from "date-fns";
import format from "date-fns/format";
import { mapState } from "vuex";
import TickIcon from "@/assets/img/tick.svg?inline";
import PencilIcon from "@/assets/img/pencil.svg?inline";
import DeleteIcon from "@/assets/img/delete.svg?inline";
export default {
  components: {
    TickIcon,
    PencilIcon,
    DeleteIcon,
  },
  props: {
    todoItem: {
      required: true,
      type: Object,
    },
  },
  computed: {
    ...mapState("todo", ["loading"]),
    completedTime() {
      return (
        this.$t("task.completed") +
        ` ${this.todoItem.completedIn} ` +
        this.$t("general.ago")
      );
    },
    createdTime() {
      return `${this.$t("task.created")} ${this.$t(
        "general.at"
      )} ${this.formatDate(this.todoItem.createdAt, "dd.MM.yy")}`;
    },
  },
  data() {
    return {
      formatDate: format,
      isEdit: false,
      showError: false,
      taskText: "",
    };
  },
  methods: {
    async deleteTask() {
      if (this.isEdit) {
        this.isEdit = false;
        this.showError = false;
      } else {
        await this.$store.dispatch("todo/removeTask", this.todoItem);
      }
    },
    markDone() {
      if (this.isEdit) {
        this.onSave();
        if (this.showError) {
          return;
        }
      }
      const completedIn = formatDistance(new Date(), this.todoItem.createdAt);
      const task = {
        id: this.todoItem.id,
        completedIn: completedIn,
      };
      this.$store.dispatch("todo/markDone", task);
    },
    editTask() {
      this.taskText = this.todoItem.text;
      this.isEdit = true;
    },
    onSave() {
      if (!this.taskText) {
        this.showError = true;
        return;
      }
      const task = {
        id: this.todoItem.id,
        updatedText: this.taskText,
      };
      this.$store.dispatch("todo/editTask", task);
      this.isEdit = false;
      this.showError = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-footer-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.card-subheader span {
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  color: #bbbdd0;
}
.mark-done {
  text-decoration: line-through;
  color: #0bc375;
}
.completed-badge{
  background: #7A8DFD;
  border-radius: 5px;
font-style: normal;
font-weight: 700;
font-size: 12px;
padding: 5px 12px;
color: #FFFFFF;
}
</style>
