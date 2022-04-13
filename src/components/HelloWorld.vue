<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input v-model.number.lazy="operand1" :name="operand1" />
    <input v-model.number.lazy="operand2" />
    = {{ result }}
    <br />
    <button @click="sum">+</button>
    <button @click="div">-</button>
    <button @click="sub">/</button>
    <button @click="mult">*</button>
    <button @click="exponentiation">^</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      result: 0,
      operand1: 0,
      operand2: 0,
    };
  },
  methods: {
    sum() {
      this.result = this.operand1 + this.operand2;
    },
    div() {
      this.result = this.operand1 - this.operand2;
    },
    sub() {
      this.result = this.operand1 / this.operand2;
    },
    mult() {
      this.result = this.operand1 * this.operand2;
    },
    exponentiation() {
      this.result = Math.pow(this.operand1, this.operand2);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
