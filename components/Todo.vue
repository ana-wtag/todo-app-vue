<template>
  <div class="card">
    <CardLoader v-if="todoItem.loading"/>
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
        <TickIcon />
      </span>
      <span class="pencil-icon mr-19">
        <PencilIcon />
      </span>
      <span class="delete-icon mr-19">
        <DeleteIcon @click="deleteTask"/>
      </span>
    </div>
  </div>
</template>

<script>
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
    ])
  },
  data() {
    return {
      isEdit: false,
      // tickIcon: require("@/assets/img/tick.svg"),
      // pencilIcon: require("@/assets/img/pencil.svg"),
      // deleteIcon: require("@/assets/img/delete.svg"),
    };
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("todo/removeTask", this.todoItem);
    }
  },
  
};
</script>
