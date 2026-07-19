// Display
const previousDisplay = document.querySelector('.past p');
const currentDisplay = document.querySelector('.main p');

// Buttons
const numberButtons = document.querySelectorAll('.one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .zero');
const operatorButtons = document.querySelectorAll('.divide, .multiply, .sub, .add');
const equalsButton = document.querySelector('.equal');
const clearButton = document.querySelector('.AC');
const decimalButton = document.querySelector('.dot');

// State
let firstNumber = '';
let operator = '';
let secondNumber = '';
let shouldResetDisplay = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, op) {
    switch (op) {
        case '+':
            return add(a, b);
        case '−':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            return 0;
    }
}

clearButton.addEventListener('click', () => {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    currentDisplay.textContent = '0';
    previousDisplay.textContent = '';
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (shouldResetDisplay) {
            currentDisplay.textContent += button.textContent;
            return;
        }
        if (currentDisplay.textContent === '0') {
            currentDisplay.textContent = '';
        }
        currentDisplay.textContent += button.textContent;
    })
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        firstNumber = currentDisplay.textContent;
        operator = button.textContent;
        currentDisplay.textContent = `${firstNumber}${operator}`;
        shouldResetDisplay = true;
    });
});

equalsButton.addEventListener('click', () => {
    const parts = currentDisplay.textContent.split(operator);
    secondNumber = parts[1];
    const result = operate(Number(firstNumber), Number(secondNumber), operator);
    currentDisplay.textContent = result;
    shouldResetDisplay = true;
});
