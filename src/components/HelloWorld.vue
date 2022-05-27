<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h5 text-sm-h3 pb-3">My Personal cost</div>
        <v-dialog v-model="dialog" width="500">
          <template #activator="{ on }">
            <v-btn v-on="on" color="teal" dark>ADD NEW COST <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <AddPaymentForm />
          </v-card>
        </v-dialog>
        <PaymentsDisplayVue :items="paymentsList" @editMode="editMode" />
      </v-col>
      <v-col>
        <div class="text-h5 text-sm-h3 pb-3">Costs by categories</div>
        <v-card>
          <Doughnut :chartDataDoughnut="chartDataDoughnut" />
        </v-card>

      </v-col>
    </v-row>

  </v-container>
</template>
<script>
import PaymentsDisplayVue from '@/components/PaymentsDisplay.vue'
import AddPaymentForm from '@/components/AddPaymentForm.vue';
import Doughnut from '@/components/DoughnutChart.vue'
export default {
  name: "MyPersonalcost",
  components: {
    PaymentsDisplayVue,
    AddPaymentForm,
    Doughnut
  },
  data() {
    return {
      dialog: false,
      chartDataDoughnut: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#DD1B16",
              "ffa500",
            ],
            data: [],
          },
        ],
      },
    };
  },
  computed: {
    paymentsList() {
      return this.$store.getters.getPaymentList;
    },
    DoughnutCategoryList() {
      const DoughnutPaymentList = this.$store.getters.getPaymentList;
      const DoughnutCategoryList = [];
      for (let i = 0; i < DoughnutPaymentList.length; i++) {
        if (!DoughnutCategoryList.includes(DoughnutPaymentList[i].category)) {
          DoughnutCategoryList.push(DoughnutPaymentList[i].category);
        }
      }
      return DoughnutCategoryList;
    },
    getCategorySumDoughnut() {
      const DoughnutPaymentList = this.$store.getters.getPaymentList;
      const CategorySum = [];
      const categoryList = this.chartDataDoughnut.labels;
      for (let category of categoryList) {
        const filteredList = DoughnutPaymentList.filter(
          (item) => item.category == category
        );
        let sum = filteredList.reduce((res, cur) => res + cur.value, 0);
        CategorySum.push(sum);
      }
      return CategorySum;
    },
  },
  watch: {
    DoughnutCategoryList() {
      this.chartDataDoughnut.labels.push(this.DoughnutCategoryList);
      if (this.DoughnutCategoryList.length === 0) {
        this.chartDataDoughnut.labels = [];
        this.chartDataDoughnut.datasets.backgroundColor = [];
        this.chartDataDoughnut.datasets.data = [];
      } else {
        this.chartDataDoughnut.labels = this.DoughnutCategoryList;
      }
    },
    getCategorySumDoughnut() {
      this.chartDataDoughnut.datasets[0].data = this.getCategorySumDoughnut;
    },
  },

  methods: {
    editMode(item) {
      this.dialog = true;
      let itemData = item;
      this.$store.commit("addDataToEditPaymentsList", itemData);
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchData");
  },
};
</script>