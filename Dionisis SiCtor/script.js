let app = new Vue({
  el: '#app',
  data() {
    return {
      current: '', // The current input or result displayed on the calculator
      memory: 0, // Stores the value in memory for memory operations
      changeMode: true, // Flag to toggle between basic and advanced modes
      resultDisplayed: false, // Flag to indicate if the current display is a result of a calculation
      history: [] // Array to store the history of calculations
    };
  },
  methods: {
    press(event) {
      let key = event.target.textContent.trim();
      // If a result is displayed and a number is pressed, clear the display
      if (this.resultDisplayed && !isNaN(key)) {
        this.current = '';
        this.resultDisplayed = false;
      }
      this.handleInput(key);
    },
    handleInput(key) {
      if (!isNaN(key)) {
        // If the current display shows 'Error', clear it before adding a new number
        if (this.current === 'Error') {
          this.current = '';
        }
        this.current += key;
      } else {
        switch (key) {
          case '=': this.evaluateExpression(); break;
          case 'C': this.clearInput(); break;
          case '<=': this.backspace(); break;
          case '±': this.toggleSign(); break;
          case '%': this.percentage(); break;
          case 'π': this.appendPi(); break;
          case 'x ²': this.square(); break;
          case '√': this.squareRoot(); break;
          case 'sin': this.sine(); break;
          case 'cos': this.cosine(); break;
          case 'tan': this.tangent(); break;
          case 'log': this.logarithm(); break;
          case 'ln': this.naturalLogarithm(); break;
          case 'x^': this.power(); break;
          case 'x !': this.factorial(); break;
          case 'e': this.eToPower(); break;
          case 'rad': this.toRadians(); break;
          case '∘': this.toDegrees(); break;
          case 'M+': this.memoryAdd(); break;
          case 'M-': this.memorySubtract(); break;
          case 'MR': this.memoryRecall(); break;
          case 'MC': this.memoryClear(); break;
          case '.': this.addDecimal(); break;
          case '+': case '-': case '*': case '/': case '(': case ')':
            this.appendOperator(key); break;
          default: break;
        }
      }
    },
    evaluateExpression() {
      try {
        let expression = this.current;
        // Check for exponentiation (e.g., x^y)
        if (this.current.includes('^')) {
          let [base, exponent] = this.current.split('^');
          this.current = Math.pow(base, exponent);
        } else {
          this.current = eval(this.current); // Evaluate the expression
        }
        // Save to history and display the result
        this.history.unshift({ expression: expression, result: this.current });
        this.resultDisplayed = true;
      } catch (e) {
        // If there's an error, show 'Error'
        this.current = 'Error';
      }
    },
    clearInput() {
      this.current = '';
      this.resultDisplayed = false;
    },
    backspace() {
      // If the display shows 'Error', clear it
      if (this.current === 'Error') {
        this.current = '';
      } else {
        // Remove the last character
        this.current = this.current.slice(0, -1);
      }
    },
    toggleSign() {
      if (this.current === 'Error') {
        this.current = '';
      } else {
        // Toggle the sign of the current input
        this.current = this.current.charAt(0) === '-' ? this.current.slice(1) : '-' + this.current;
      }
    },
    percentage() {
      if (this.current !== 'Error') {
        let expression = this.current + '%';
        this.current = this.current / 100; // Convert to percentage
        this.history.unshift({ expression: expression, result: this.current });
        this.resultDisplayed = true;
      }
    },
    appendPi() {
      if (this.current === 'Error') {
        this.current = Math.PI.toString();
      } else {
        this.current += Math.PI; // Append the value of Pi
      }
    },
    square() {
      if (this.current !== 'Error') {
        let expression = this.current + '²';
        this.current = Math.pow(this.current, 2); // Square the current input
        this.history.unshift({ expression: expression, result: this.current });
        this.resultDisplayed = true;
      }
    },
    squareRoot() {
      if (this.current !== 'Error') {
        let expression = '√' + this.current;
        this.current = Math.sqrt(this.current); // Calculate the square root
        this.history.unshift({ expression: expression, result: this.current });
        this.resultDisplayed = true;
      }
    },
    sine() {
      if (this.current !== 'Error') {
        let expression = 'sin(' + this.current + ')';
        this.current = Math.sin(this.current); // Calculate sine
        this.history.unshift({ expression: expression, result: this.current });
        this.resultDisplayed = true;
      }
    },
    cosine() {
      if (this.current !== 'Error') {
        let expression = 'cos(' + this.current + ')';
        this.current = Math.cos(this.current); // Calculate cosine
        this.history.unshift({ expression: expression, result: this.current });
        this.resultDisplayed = true;
      }
    },
    tangent() {
      if (this.current !== 'Error') {
        let expression = 'tan(' + this.current + ')';
        this.current = Math.tan(this.current); // Calculate tangent
        this.history.unshift({ expression: expression, result: this.current });
        this.resultDisplayed = true;
      }
    },
    logarithm() {
      if (this.current !== 'Error') {
        let expression = 'log(' + this.current + ')';
        this.current = Math.log10(this.current); // Calculate base 10 logarithm
        this.history.unshift({ expression: expression, result: this.current });
        this.resultDisplayed = true;
      }
    },
    naturalLogarithm() {
      if (this.current !== 'Error') {
        let expression = 'ln(' + this.current + ')';
        this.current = Math.log(this.current); // Calculate natural logarithm
        this.history.unshift({ expression: expression, result: this.current });
        this.resultDisplayed = true;
      }
    },
    power() {
      if (this.current !== 'Error') {
        this.current += '^'; // Add the power operator
      }
    },
    factorial() {
      if (this.current !== 'Error') {
        let number = parseInt(this.current);
        let expression = this.current + '!';
        if (number === 0) {
          this.current = '1';
        } else if (number < 0) {
          this.current = 'NaN';
        } else {
          this.current = this.factorialCalc(number); // Calculate factorial
        }
        this.history.unshift({ expression: expression, result: this.current });
        this.resultDisplayed = true;
      }
    },
    factorialCalc(n) {
      // Helper function to calculate factorial
      return n ? n * this.factorialCalc(n - 1) : 1;
    },
    eToPower() {
      if (this.current !== 'Error') {
        let expression = 'e^(' + this.current + ')';
        this.current = Math.exp(this.current); // Calculate e^current
        this.history.unshift({ expression: expression, result: this.current });
        this.resultDisplayed = true;
      }
    },
    toRadians() {
      if (this.current !== 'Error') {
        let expression = this.current + '° to rad';
        this.current = this.current * (Math.PI / 180); // Convert degrees to radians
        this.history.unshift({ expression: expression, result: this.current });
        this.resultDisplayed = true;
      }
    },
    toDegrees() {
      if (this.current !== 'Error') {
        let expression = this.current + ' rad to °';
        this.current = this.current * (180 / Math.PI); // Convert radians to degrees
        this.history.unshift({ expression: expression, result: this.current });
        this.resultDisplayed = true;
      }
    },
    memoryAdd() {
      if (this.current !== 'Error') {
        let expression = `M+(${this.current})`;
        this.memory += parseFloat(this.current); // Add current value to memory
        this.history.unshift({ expression: expression, result: this.memory });
      }
    },
    memorySubtract() {
      if (this.current !== 'Error') {
        let expression = `M-(${this.current})`;
        this.memory -= parseFloat(this.current); // Subtract current value from memory
        this.history.unshift({ expression: expression, result: this.memory });
      }
    },
    memoryRecall() {
      if (this.resultDisplayed || this.current === 'Error') {
        this.current = this.memory.toString(); // Recall memory value
        this.resultDisplayed = false;
      } else {
        this.current += this.memory.toString();
      }
    },
    memoryClear() {
      let expression = 'MC';
      this.memory = 0; // Clear memory
      this.history.unshift({ expression: expression, result: this.memory });
    },
    addDecimal() {
      if (this.current === 'Error') {
        this.current = '0.';
      } else if (this.resultDisplayed) {
        this.current = '0.';
        this.resultDisplayed = false;
      } else {
        // Split by operators to get the last operand
        const lastOperand = this.current.split(/[\+\-\*\/\(\)]/).pop();
        if (!lastOperand.includes('.')) {
          this.current += '.'; // Add decimal point if not already present
        }
      }
    },
    appendOperator(operator) {
      if (this.resultDisplayed) {
        this.resultDisplayed = false;
      }
      if (this.current === 'Error') {
        this.current = '';
      }
      this.current += operator; // Add the operator to the current input
    },
    changeModeEvent() {
      this.changeMode = !this.changeMode; // Toggle between basic and advanced modes
    }
  }
});
