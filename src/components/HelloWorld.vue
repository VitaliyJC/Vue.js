<template>
  <div class="home">
    <header>
      <div class="title">My personal costs</div>
      <div>Total Price = {{ getFullPaymentValue }}</div>
    </header>
    <main>
      <button @click="showForm = !showForm">Add new cost +</button>
      <AddPaymentForm v-if="showForm" />
      <PaymentsDisplay :items="currentElements" />
      <!-- <AddPaymentForm v-if="showForm" @addNewPayment="addPaymentData" /> -->
      <MyPagination :cur="cur" :length="12" :n="n" @changePage="changePage" />
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
      n: 3,
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
      this.$store.dispatch("fetchData", p);
    },
  },
  created() {
    this.$store.dispatch("fetchData", this.cur);
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
