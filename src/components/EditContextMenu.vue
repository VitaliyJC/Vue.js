<template>
  <div class="wrapper">
    <div v-if="showForm">
      <AddPaymentForm :showContextMenuForm="showForm" :activeTarget="activeTarget" />
    </div>
    <div v-if="showBtns">
      <div>
        <v-card elevation="2">
          <v-btn @click="startEditData" color="teal mr-2" dark elevation="2" small x-small>EDIT</v-btn>
          <v-btn @click="removeData" color="teal" dark elevation="2" small x-small>DELETE</v-btn>
        </v-card>
      </div>
    </div>
  </div>
  <!-- <div class="wrapper">
    <div v-if="showForm">
      <AddPaymentForm :showContextMenuForm="showForm" :activeTarget="activeTarget" />
    </div>
    <div v-if="showBtns">
      <div><button @click="startEditData">Edit</button></div>
      <div><button @click="removeData">Delet</button></div>
    </div>
  </div> -->
</template>

<script>
export default {
  name: "EditContextMenu",
  props: {
    activeTarget: Number,
    default: () => Number,
  },
  data() {
    return {
      showBtns: true,
      showForm: false,
    };
  },
  components: {
    AddPaymentForm: () => import("./AddPaymentForm.vue"),
  },
  methods: {
    startEditData() {
      this.showForm = true;
      this.showBtns = false;
    },
    removeData() {
      this.$store.commit("removeItemFromPaymentsList", this.activeTarget);
      this.$editContextMenu.hide("hide");
    },
  },
};
</script>