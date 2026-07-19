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
