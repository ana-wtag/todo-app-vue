<template>
  <div class="card">
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
        <span class="tick-icon" v-if="!todoItem.done" @click="markDone">
          <img :src="tickIcon" />
        </span>
        <span class="pencil-icon" v-if="!todoItem.done && !isEdit">
          <img :src="pencilIcon" />
        </span>
        <span class="delete-icon" @click="deleteTask">
          <img :src="deleteIcon" />
        </span>
      </div>
      <div class="card-footer-right">
        <span class="completed-badge" v-if="todoItem.done">{{
          $t(`Completed in ${todoItem.completedIn} days`)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import differenceInDays from 'date-fns/differenceInDays'
import format from 'date-fns/format'
export default {
  props: {
    todoItem: {
      required: true,
      type: Object,
    },
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
      const completedIn = differenceInDays(new Date(), this.todoItem.createdAt)
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
    .card-footer {
        display: flex;
        justify-content: space-between;
    }
    .mark-done {
      text-decoration: line-through;
      color: #0BC375;
    }
</style>
