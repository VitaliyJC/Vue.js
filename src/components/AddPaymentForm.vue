<template>
  <div class="form-wrapper">
    <input v-model="date" placeholder="date" />
    <select v-model="category" v-if="categoryList">
      <option v-for="(value, idx) in categoryList" :key="idx">
        {{ value }}
      </option>
    </select>
    <input v-model.number="value" placeholder="value" />
    <button @click="onClickSave">Save</button>
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
  },
  async created() {
    await this.$store.dispatch("fetchCategoryList");
  },
  mounted() {},
};
</script>
