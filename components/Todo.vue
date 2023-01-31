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
          <TickIcon />
        </span>
        <span class="pencil-icon mr-19" v-if="!todoItem.done && !isEdit">
          <PencilIcon />
        </span>
        <span class="delete-icon mr-19" @click="deleteTask">
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
import {formatDistance} from 'date-fns'
import format from 'date-fns/format'
import { mapState, mapGetters } from "vuex";
import TickIcon from "@/assets/img/tick.svg?inline";
import PencilIcon from "@/assets/img/pencil.svg?inline";
import DeleteIcon from "@/assets/img/delete.svg?inline";
export default {
  components: {
    TickIcon,
    PencilIcon,
    DeleteIcon
  },
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
    ]),
    completedTime() {
      return this.$t("Completed") + ` ${this.todoItem.completedIn} `+ this.$t("ago")
    }
  },
  data() {
    return {
      formatDate: format,
      isEdit: false,
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
    }
  },
};
</script>

<style lang="scss" scoped>
    .mark-done {
      text-decoration: line-through;
      color: #0BC375;
    }
</style>
