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
          <Doughnut :items="paymentsList" />
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
      components: { Doughnut }
    }
  },
  computed: {
    paymentsList() {
      return this.$store.getters.getPaymentList;
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