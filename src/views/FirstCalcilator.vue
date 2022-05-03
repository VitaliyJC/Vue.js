<template>
  <div class="mycalc">
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
      <MyCalculator msg="Калькулятор" />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import MyCalculator from "@/components/MyCalculator.vue";

export default {
  name: "FirstCalcilator",
  components: { MyCalculator },
};
</script>
