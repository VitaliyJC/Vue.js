<template>

  <v-card class="pa-8">
    <v-text-field v-model="date" label="Date" />
    <v-text-field v-model="value" label="Value" />
    <v-select v-model="category" :items="categoryList" label="Category" />
    <v-btn color="teal" dark @click="onClickSave" :ripple="false">Save</v-btn>
  </v-card>

  <!-- <div class="form-wrapper">
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
  </div> -->
</template>
<script>
export default {
  name: "AddPaymentForm",
  data() {
    return {
      date: "",
      category: "",
      value: "",
      showEditBtn: false,
    };
  },
  props: {},
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
    editDataList() {
      return this.$store.getters.getEditDataList;
    },
  },
  methods: {
    onClickSave() {
      if (this.editDataList.length === 0) {
        const data = {
          date: this.date || this.getCurrentDate,
          category: this.category,
          value: this.value,
        };
        this.$store.commit("addDataToPaymentsList", data);
      } else {
        let editObj = {
          date: this.date,
          category: this.category,
          value: this.value,
        };
        this.$store.commit("editPaymentsListItem", editObj);
      }
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
