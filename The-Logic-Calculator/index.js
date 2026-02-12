class Calculator {

    constructor() {
        this.expression = "";
        this.justCalculated = false;
        this.history = [];
    }

    appendNumber(value) {

        if (this.justCalculated) {
            alert("Press operator to continue");
            return;
        }

        this.expression += value;
    }

    chooseOperator(op) {

        if (this.expression === "" && op === "-") {
            this.expression = "-";
            return;
        }

        const lastChar = this.expression.slice(-1);

        if (["+", "-", "*", "/", "%"].includes(lastChar)) {
            this.expression = this.expression.slice(0, -1) + op;
            return;
        }

        this.justCalculated = false;
        this.expression += op;
    }

    addDecimal() {

        const parts = this.expression.split(/[\+\-\*\/%]/);
        const lastPart = parts[parts.length - 1];

        if (!lastPart.includes(".")) {
            this.expression += ".";
        }
    }

    addBracket() {
        this.expression += "()";
    }

    delete() {

        if (this.justCalculated) return;

        this.expression = this.expression.slice(0, -1);
    }

    clearAll() {
        this.expression = "";
        this.justCalculated = false;
    }

    calculate() {

        if (this.expression === "") return;

        try {
            const originalExp = this.expression;

            const result = eval(this.expression);

            this.history.push({
                exp: originalExp,
                result: result
            });

            this.expression = result.toString();
            this.justCalculated = true;

            this.renderHistory();

        } catch {
            alert("Invalid Expression");
        }
    }

    updateDisplay() {
        const input = document.getElementById("cal_input");
        input.value = this.expression || 0;

        // Move cursor to end
        input.selectionStart = input.selectionEnd = input.value.length;

        // Auto scroll to right
        input.scrollLeft = input.scrollWidth;
    }

    renderHistory() {

        const historyDiv = document.getElementById("historyList");
        historyDiv.innerHTML = "";

        this.history.forEach((item) => {

            const div = document.createElement("div");
            div.innerText = item.exp + " = " + item.result;

            div.style.cursor = "pointer";
            div.style.border = "1px solid #455d7a";
            div.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";

            div.addEventListener("click", () => {
                this.expression = item.result.toString();
                this.justCalculated = true;
                this.updateDisplay();
            });

            historyDiv.appendChild(div);
        });
    }
}


const calc = new Calculator();

const numberButtons = document.getElementsByClassName("number");
const operatorButtons = document.getElementsByClassName("operator");
const equalsButton = document.getElementById("equals");

// Add event to all number buttons
for (let button of numberButtons) {
    button.addEventListener("click", function (e) {
        console.log("Clicked:", e.target.value);
        calc.appendNumber(e.target.value);
        calc.updateDisplay();
    });
}

// Add event to all operator buttons
for (let button of operatorButtons) {
    button.addEventListener("click", function (e) {
        calc.chooseOperator(e.target.value);
        console.log("Operator:", calc.operator);
        calc.updateDisplay();
    });
}

// Equals button
equalsButton.addEventListener("click", function () {
    calc.calculate();
    calc.updateDisplay();
    console.log("Result:", calc.currentValue);
    console.log("Prev:", calc.previousValue);
    console.log("Curr:", calc.currentValue);
    console.log("Operator:", calc.operator);
});

// clear all
document.getElementById("ac").addEventListener("click", function (e) {
    calc.clearAll();
    calc.updateDisplay();
    console.log("clearAllPrev:", calc.previousValue);
    console.log("clearAllCurr:", calc.currentValue);
    console.log("clearAllOperator:", calc.operator);
    console.log("clearAllexpression:", calc.expression);
})

// delete
document.getElementById("del").addEventListener("click", function (e) {
    calc.delete()
    calc.updateDisplay();
    console.log("clearAllPrev:", calc.previousValue);
    console.log("clearAllCurr:", calc.currentValue);
    console.log("clearAllOperator:", calc.operator);
})

document.querySelector(".dot").addEventListener("click", () => {
    calc.appendNumber(".");
    calc.updateDisplay();
});

document.querySelector(".bracket").addEventListener("click", () => {
    calc.expression += "()";
    calc.updateDisplay();
});