"use strict";
const pads = document.querySelectorAll(".number");
const decimal = document.querySelector("#decimal");
const clearBtn = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
const operands = document.querySelectorAll(".operand");
const prev = document.querySelector("#prev");
const display = document.querySelector("#display");
const operand = document.querySelector("#operand");
const equals = document.querySelector("#equals");
const negate = document.querySelector("#negate");

class Calculator {
    constructor() {
        this.current = "0";
        this.prev = "0";
        this.operand = null;
    }
    render() {
        prev.innerHTML = this.prev;
        display.innerHTML = this.current;
        operand.innerHTML = this.operand;
    }
    clear() {
        this.current = "0";
        this.prev = "0";
        this.operand = null;
        this.render();
    }
    backspace() {
        console.log("backspace");
        if (parseInt(this.current) === 0) {
            return;
        } else {
            if (String(this.current).length === 1) {
                this.current = "0";
            } else {
                this.current = String(this.current).slice(
                    0,
                    String(this.current).length - 1
                );
            }
            this.render();
        }
    }
    calculate() {
        if (this.operand) {
            const expr = `${this.prev}${this.operand}${this.current}`;
            const result = eval(expr);
            this.prev = 0;
            this.current = 0;
            this.operand = null;

            operand.innerHTML = "=";
            prev.innerHTML = expr;
            display.innerHTML = result;
        }
    }
    input(n) {
        if (parseInt(this.current) === 0 && parseInt(n) === 0) {
            return;
        } else if (
            parseInt(this.current) === 0 &&
            parseInt(n) !== 0 &&
            !String(this.current).includes(".")
        ) {
            this.current = n;
        } else {
            this.current = `${this.current}${n}`;
        }
        this.render();
    }
    negate() {
        this.current = -this.current;
        this.render();
    }

    operate(operand) {
        if (parseInt(this.prev) === 0) {
            this.prev = this.current;
            this.current = 0;
            this.operand = operand;
        } else {
            const result = eval(`${this.prev}${this.operand}${this.current}`);
            this.prev = result;
            this.operand = operand;
            this.current = 0;
        }
        this.render();
    }
    addDecimal() {
        if (String(this.current).includes(".")) return;
        this.current = this.current + ".";
        this.render();
    }
}

const calc = new Calculator();
calc.render();

pads.forEach((pad) => {
    pad.addEventListener("click", function (e) {
        const number = e.target.innerText;
        calc.input(number);
    });
});

operands.forEach((operand) => {
    operand.addEventListener("click", function (e) {
        calc.operate(e.target.dataset.operand);
    });
});

clearBtn.addEventListener("click", function () {
    calc.clear();
});

equals.addEventListener("click", function () {
    calc.calculate();
});
decimal.addEventListener("click", function () {
    calc.addDecimal();
});
negate.addEventListener("click", function () {
    calc.negate();
});

backspace.addEventListener("click", function () {
    calc.backspace();
});
