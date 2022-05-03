<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input v-model.lazy="operand1" />
    <input v-model.lazy="operand2" />
    = {{ result }}
    <br />
    <div class="error" v-show="error">
      {{ error }}
    </div>

    <div class="keybord">
      <button
        v-for="operation in operations"
        v-bind:key="operation"
        @click="calculate(operation)"
      >
        {{ operation }}
      </button>
    </div>
    <br />
    <input type="checkbox" id="jack" value="checkbox" v-model="checked" />
    <label for="checkbox"> Отобразить экранную клавиатуру</label>
    <div class="numbers" v-show="checked">
      <div class="keyBtn">
        <button v-for="num in keyBtn" v-bind:key="num" @click="inpunNum(num)">
          {{ num }}
        </button>
        <button @click="clearInput()">←</button>
      </div>
      <br />
      <input
        type="radio"
        id="one"
        value="operand1"
        v-model="picked"
        name="radio"
      />
      <label for="one">Операнд 1</label>
      <input
        type="radio"
        id="two"
        value="operand2"
        v-model="picked"
        name="radio"
      />
      <label for="two">Операнд 2</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstCalculator",
  props: {
    msg: String,
  },
  data() {
    return {
      result: 0,
      operand1: "0",
      operand2: "0",
      error: "",
      checked: "",
      picked: "operand1",
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
      this.result = +this.operand1 + +this.operand2;
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
      if (this.picked === "operand1") {
        this.operand1 += num;
      } else {
        this.operand2 += num;
      }
    },
    clearInput() {
      if (this.picked === "operand1") {
        this.operand1 = this.operand1.slice(0, -1);
      } else {
        this.operand2 = this.operand2.slice(0, -1);
      }
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