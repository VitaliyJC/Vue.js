<template>
  <div class="form-wrapper">
    <input v-model="date" placeholder=" date" />
    <select v-model="category" v-if="categoryList">
      <option v-for="(value, idx) in categoryList" :key="idx">
        {{ value }}
      </option>
    </select>
    <input v-model.number="value" placeholder="value" />
    <button @click="onClickSave" v-if="!showContextMenuForm">Save</button>
    <button @click="editData" v-if="showContextMenuForm">
      Закончить редактирование
    </button>
  </div>
</template>
<script>
export default {
  name: "AddPaymentForm",
  data() {
    return {
      date: "",
      category: "",
      value: "",
    };
  },
  props: {
    showContextMenuForm: Boolean,
    activeTarget: Number,
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("UTC", options).format(today);
    },
    categoryList() {
      return this.$store.getters.getCategoryList;
    },
  },
  methods: {
    onClickSave() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value,
      };
      this.$store.commit("addDataToPaymentsList", data); //привязка к хранилищу
      // this.$emit("addNewPayment", data); без привязки к хранилищу
    },
    editData() {
      let editObj = {
        date: this.date,
        category: this.category,
        value: this.value,
      };
      this.$store.commit("editPaymentsListItem", [this.activeTarget, editObj]);
      this.$editContextMenu.hide("hide");
    },
  },
  async created() {
    await this.$store.dispatch("fetchCategoryList");
  },
  mounted() {
    const { category, section } = this.$route.params;
    if (!category || !section) {
      return;
    }
    this.category = category;
    const { value } = this.$route.query;
    if (!value) return;
    this.value = value;
    if (this.value && this.category) {
      this.onClickSave();
    }
  },
};
</script>
