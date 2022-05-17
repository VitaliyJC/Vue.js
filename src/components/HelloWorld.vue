<template>
  <div class="home">
    <header>
      <div class="title">My personal costs</div>
      <div>Total Price = {{ getFullPaymentValue }}</div>
    </header>
    <main>
      <button @click="openModalForm">Add new cost +</button>
      <!-- <button @click="showForm = !showForm">Add new cost +</button> -->
      <AddPaymentForm v-if="showForm" />
      <PaymentsDisplay :items="currentElements" :curPage="cur"/>
      <!-- <AddPaymentForm v-if="showForm" @addNewPayment="addPaymentData" /> -->
      <MyPagination :cur="cur" :length="getPaymentsList.length" :n="n" @changePage="changePage" />
      <router-link
      :to="{
        name: 'AddPaymentForm',
        params: { section: 'payment', category: 'Food' },
        query: { value: 200 },
      }">Food 200</router-link>
    <br />
    <router-link
      :to="{
        name: 'AddPaymentForm',
        params: { section: 'payment', category: 'Transport' },
        query: { value: 50 },
      }">Transport 50</router-link>
    <br />
    <router-link
      :to="{
        name: 'AddPaymentForm',
        params: { section: 'payment', category: 'Entertainment' },
        query: { value: 2000 },
      }">Entertainment 2000</router-link>
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "@/components/PaymentsDisplay.vue";
import AddPaymentForm from "@/components/AddPaymentForm.vue";
import { mapGetters, mapMutations } from "vuex";
import MyPagination from "@/components/MyPagination.vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    MyPagination,
  },
  data() {
    return {
      showForm: false,
      cur: 1,
      n: 5,
    };
  },

  computed: {
    ...mapGetters(["getFullPaymentValue", "getPaymentsList"]),
    currentElements() {
      return this.getPaymentsList.slice(
        this.n * (this.cur - 1),
        this.n * (this.cur - 1) + this.n
      );
    },
    // getFPV() {
    //   return this.$store.getters.getFullPaymentValue;
    // },
  },
  methods: {
    ...mapMutations(["setPaymentsListData"]),
    addPaymentData(data) {
      this.paymentsList.push(data);
    },
    // fetchData() {
    //   return [
    //     {
    //       date: "28.03.2020",
    //       category: "Food",
    //       value: 169,
    //     },
    //     {
    //       date: "24.03.2020",
    //       category: "Transport",
    //       value: 360,
    //     },
    //     {
    //       date: "24.03.2020",
    //       category: "Food",
    //       value: 532,
    //     },
    //   ];
    // },
    changePage(p) {
      this.cur = p;
    },
    openModalForm(){
      this.$modal.show('addform', {title: "Add New Payment", component: 'AddPaymentForm'})
    }
  },
  created() {
    this.$store.dispatch("fetchData");
    // this.$store.commit('setPaymentsListData', this.fetchData())
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
}
</style>
