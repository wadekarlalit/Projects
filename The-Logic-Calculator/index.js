// console.log("JS connected successfully");

// /**************************************************
//  * CALCULATOR CLASS
//  * -----------------------------------------------
//  * This class represents a real-world Calculator.
//  * 
//  * 👉 OOP CONCEPT: CLASS
//  * A class is a blueprint for creating objects.
//  **************************************************/
// class Calculator {

//     /**************************************************
//      * CONSTRUCTOR
//      * -----------------------------------------------
//      * Automatically runs when an object is created.
//      * Used to initialize the state (data).
//      *
//      * 👉 OOP CONCEPT: ENCAPSULATION
//      * Data and methods are wrapped together.
//      **************************************************/
//     constructor() {
//         this.currentValue = "";     // current input / result
//         this.previousValue = ""; // stores previous number
//         this.operator = null;      // stores operator (+, -, etc.)
//         this.history = [];         // stores calculation history
//     }

//     /**************************************************
//      * ADD METHOD
//      * -----------------------------------------------
//      * Performs addition of two numbers.
//      *
//      * 👉 OOP CONCEPT: METHOD
//      * A function that belongs to a class.
//      **************************************************/
//     add(a, b) {
//         return a + b;
//     }

//     /**************************************************
//      * CALCULATE METHOD
//      * -----------------------------------------------
//      * Uses operator to decide which operation to run.
//      *
//      * 👉 OOP CONCEPT: ABSTRACTION
//      * User doesn't care HOW addition works,
//      * they just call calculate().
//      **************************************************/
//     calculate() {
//         let result;

//         if (this.operator === "+") {
//             result = this.add(this.previousValue, this.currentValue);
//         }

//         // future:
//         // if (this.operator === "-") ...
//         // if (this.operator === "*") ...
//         // if (this.operator === "/") ...

//         // save result
//         this.currentValue = result;

//         // log history
//         this.logHistory(
//             `${this.previousValue} ${this.operator} ${this.currentValue} = ${result}`
//         );

//         // reset
//         this.previousValue = null;
//         this.operator = null;

//         return result;
//     }

//     /**************************************************
//      * LOG HISTORY METHOD
//      * -----------------------------------------------
//      * Stores calculation history.
//      *
//      * 👉 OOP CONCEPT: SINGLE RESPONSIBILITY
//      * Only handles history logic.
//      **************************************************/
//     logHistory(entry) {
//         this.history.push(entry);
//     }
// }

// const calc = new Calculator();

// var button = document.getElementsByClassName(".number");

// button.addEventListener("click", function add(e){
//     console.log("hello", e.target.value)
//     calc.currentValue = e.target.value;
//     calc.previousValue = calc.currentValue
// })

// calc.operator = "+";

// calc.calculate();


//..................................................................

class Calculator {
    constructor() {
        this.currentValue = "";
        this.previousValue = "";
        this.operator = null;
    }

    // OOP Concept: Method
    appendNumber(number) {
        // this.currentValue += number;
        // Prevent multiple decimals
    if (number === "." && this.currentValue.includes(".")) return;

    // If current is "0" and user presses another "0" → ignore
    if (this.currentValue === "0" && number === "0") return;

    // If current is "0" and user presses non-decimal number → replace
    if (this.currentValue === "0" && number !== ".") {
        this.currentValue = number;
        return;
    }

    this.currentValue += number;
    }

    chooseOperator(operator) {
        if(this.currentValue === "") return;
        
        if(this.previousValue !== ""){
            this.calculate();
            this.previousValue = this.currentValue;
            this.currentValue = "";
        } else {
            this.previousValue = this.currentValue;
            this.currentValue = "";
        }
        this.operator = operator;
    }

    clearAll() {
        this.currentValue = "";
        this.previousValue = "";
        this.operator = null;
    }

    delete() {
        this.currentValue = this.currentValue.toString().slice(0, -1)
    }

    calculate() {
        let result;

        const prev = parseFloat(this.previousValue);
        const curr = parseFloat(this.currentValue);

        if (isNaN(prev) || isNaN(curr)) return;

        switch (this.operator) {
            case "+":
                result = prev + curr;
                break;
            case "-":
                result = prev - curr;
                break;
            case "*":
                result = prev * curr;
                break;
            case "/":
                result = prev / curr;
                break;
            case "%":
                result = prev % curr;
                break;
        }

        this.currentValue = result;
        this.operator = null;
        this.previousValue = "";
    }

    updateDisplay() {
        document.getElementById("cal_input").value = this.currentValue || this.previousValue || 0 || this.operator;
    }
}

const calc = new Calculator();

const numberButtons = document.getElementsByClassName("number");
const operatorButtons = document.getElementsByClassName("operator");
const equalsButton = document.getElementById("equals");

// Add event to all number buttons
for (let button of numberButtons) {
        button.addEventListener("click", function(e) {
        console.log("Clicked:", e.target.value);
        calc.appendNumber(e.target.value);
        calc.updateDisplay();
    });
}

// Add event to all operator buttons
for (let button of operatorButtons) {
    button.addEventListener("click", function(e) {
        calc.chooseOperator(e.target.value);
        console.log("Operator:", calc.operator);
        calc.updateDisplay();
    });
}

// Equals button
equalsButton.addEventListener("click", function() {
    calc.calculate();
    calc.updateDisplay();
    console.log("Result:", calc.currentValue);
    console.log("Prev:", calc.previousValue);
    console.log("Curr:", calc.currentValue);
    console.log("Operator:", calc.operator);
});

// clear all
document.getElementById("ac").addEventListener("click", function(e) {
    calc.clearAll();
    calc.updateDisplay();
    console.log("clearAllPrev:", calc.previousValue);
    console.log("clearAllCurr:", calc.currentValue);
    console.log("clearAllOperator:", calc.operator);
})

// delete
document.getElementById("del").addEventListener("click", function(e) {
    calc.delete()
    calc.updateDisplay();
    console.log("clearAllPrev:", calc.previousValue);
    console.log("clearAllCurr:", calc.currentValue);
    console.log("clearAllOperator:", calc.operator);
})
