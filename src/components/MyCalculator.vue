<template>
  <div class="calculator">
    <h1>{{ msg }}</h1>
    <input v-model.number="operand1" name="operand1"/>
    <input v-model.number="operand2" name="operand2"/>
    = {{ result }}
    <br />
    <div class="error" v-show="error">
      {{ error }}
    </div>

    <div class="keybord">
      <button
        v-for="operation in operations"
        :key="operation"
        @click="calculate(operation)"
        :name="operation"
      >
        {{ operation }}
      </button>
    </div>
    <br />
    <input type="checkbox" id="jack" value="checkbox" v-model="checked" />
    <label for="checkbox"> Отобразить экранную клавиатуру</label>
    <div class="numbers" v-show="checked">
      <div class="keyBtn">
        <button v-for="num in keyBtn" :key="num" @click="inpunNum(num)" :name="num" type="keyboard">
          {{ num }}
        </button>
        <button @click="clearInput()" name="←">←</button>
      </div>
      <br />
      <label><input
        type="radio"
        value="1"
        v-model="picked"
      />Операнд 1</label>
      <label><input
        type="radio"
        value="2"
        v-model="picked"
      />Операнд 2</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCalculator",
  props: {
    msg: String,
  },
  data() {
    return {
      result: 0,
      operand1: 0,
      operand2: 0,
      error: "",
      checked: false,
      picked: "1",
      operations: ["+", "-", "/", "*", "^"],
      keyBtn: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
  methods: {
    calculate(operation = "+") {
      this.error = "";
      switch (operation) {
        case "+":
          this.add();
          break;
        case "-":
          this.substract();
          break;
        case "*":
          this.multiply();
          break;
        case "/":
          this.divide();
          break;
        case "^":
          this.exponentiation();
          break;
      }
    },
    add() {
      this.result = this.operand1 + this.operand2;
    },
    substract() {
      this.result = this.operand1 - this.operand2;
    },
    divide() {
      const { operand1, operand2 } = this;
      if (operand2 === 0) {
        this.error = "Делить на 0 нельзя!";
        return;
      }
      this.result = operand1 / operand2;
    },
    multiply() {
      this.result = this.operand1 * this.operand2;
    },
    exponentiation() {
      this.result = Math.pow(this.operand1, this.operand2);
    },
    inpunNum(num) {
      const { picked } = this;
      const input = picked === "1" ? "operand1" : "operand2";
      this[input] = +(this[input] += String(num));
    },
    clearInput() {
      const { picked } = this;
      const input = picked === "1" ? "operand1" : "operand2";
      this[input] = +String(this[input]).slice(0, -1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>