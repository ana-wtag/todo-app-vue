<template>
  <div class="card">
    <CardLoader v-if="todoItem.loading"/>
    <textarea v-if="isEdit" v-model="todoItem.text"></textarea>

    <template v-else>
      <div class="card-header" :class="{ 'mark-done': todoItem.done }">
        {{ todoItem.text }}
      </div>
      <div class="card-subheader">
        <span>Created At {{ formatDate(todoItem.createdAt, 'dd.MM.yy') }}</span>
      </div>
    </template>

    <div class="card-footer">
      <div class="card-footer-left">
        <button v-if="isEdit" @click="onSave">{{ $t("Save") }}</button>
        <span class="tick-icon mr-19" v-if="!todoItem.done" @click="markDone">
          <img :src="tickIcon" />
        </span>
        <span class="pencil-icon mr-19" v-if="!todoItem.done && !isEdit" @click="editTask">
          <img :src="pencilIcon" />
        </span>
        <span class="delete-icon mr-19" @click="deleteTask">
          <img :src="deleteIcon" />
        </span>
      </div>
      <div class="card-footer-right">
        <span class="completed-badge" v-if="todoItem.done">{{
          $t(`Completed ${todoItem.completedIn} ago`)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDistance} from 'date-fns'
import format from 'date-fns/format'
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    todoItem: {
      required: true,
      type: Object,
    },
  },
  computed: {
    ...mapState("todo", ["loading"]),
    ...mapGetters([
      'getTaskById'
    ])
  },
  data() {
    return {
      formatDate: format,
      isEdit: false,
      tickIcon: require("@/assets/img/tick.svg"),
      pencilIcon: require("@/assets/img/pencil.svg"),
      deleteIcon: require("@/assets/img/delete.svg"),
    };
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("todo/removeTask", this.todoItem);
    },
    markDone() {
      const completedIn = formatDistance(new Date(), this.todoItem.createdAt)
      const task = {
        id: this.todoItem.id,
        completedIn: completedIn
      }
      this.$store.dispatch("todo/markDone", task)
    },
    editTask() {
      this.isEdit = true
    },
    onSave() {
      this.$store.dispatch("todo/editTask", task)
    }
  },
};
</script>

<style lang="scss" scoped>
    // .card-footer {
    //     display: flex;
    //     justify-content: space-between;
    // }
    .mark-done {
      text-decoration: line-through;
      color: #0BC375;
    }
</style>
