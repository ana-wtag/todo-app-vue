<template>
  <div class="card">
    <textarea v-if="isEdit" v-model="todoItem.text"></textarea>

    <template v-else>
      <div class="card-header">
        {{ todoItem.text }}
      </div>
      <div class="card-subheader">
        <span>Created At {{ todoItem.createdAt }}</span>
      </div>
    </template>

    <div class="card-footer">
      <button v-if="isEdit" @click="onSave">Save</button>
      <span class="tick-icon mr-19" v-else>
        <img :src="tickIcon" />
      </span>
      <span class="pencil-icon mr-19">
        <img :src="pencilIcon" />
      </span>
      <span class="delete-icon mr-19" @click="deleteTask">
        <img :src="deleteIcon" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todoItem: {
      required: true,
      type: Object,
    },
  },
  
  data() {
    return {
      isEdit: false,
      tickIcon: require("@/assets/img/tick.svg"),
      pencilIcon: require("@/assets/img/pencil.svg"),
      deleteIcon: require("@/assets/img/delete.svg"),
    };
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("todo/removeTask", this.todoItem);
    }
  },
  
};
</script>
