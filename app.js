// Display
const previousDisplay = document.querySelector('.past p');
const currentDisplay = document.querySelector('.main p');

// Buttons
const numberButtons = document.querySelectorAll('.one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .zero');
const operatorButtons = document.querySelectorAll('.divide, .multiply, .sub, .add');
const equalsButton = document.querySelector('.equal');
const clearButton = document.querySelector('.AC');
const deleteButton = document.querySelector('.del');
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
    if (b === 0) {
        return 'are u dumb?';
    }
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
    shouldResetDisplay = false;
});

deleteButton.addEventListener('click', () => {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1) || '0';
});

decimalButton.addEventListener('click', () => {
    if (shouldResetDisplay) {
        currentDisplay.textContent = '0.';
        shouldResetDisplay = false;
        return;
    }
    // Get the current number (after any operator)
    let currentNumber = currentDisplay.textContent;
    if (currentNumber.includes('+') || currentNumber.includes('−') || currentNumber.includes('×') || currentNumber.includes('÷')) {
        const parts = currentDisplay.textContent.split(operator);
        currentNumber = parts[1] || '';
    }
    if (!currentNumber.includes('.')) {
        currentDisplay.textContent += '.';
    }
        
    
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (shouldResetDisplay) {
            const hasOperator = currentDisplay.textContent.includes('+') || 
                                currentDisplay.textContent.includes('−') || 
                                currentDisplay.textContent.includes('×') || 
                                currentDisplay.textContent.includes('÷');
            
            if (hasOperator) {
                currentDisplay.textContent += button.textContent;
            } else {
                currentDisplay.textContent = button.textContent;
            }
            shouldResetDisplay = false;
            return;
        }
        if (currentDisplay.textContent === '0') {
            currentDisplay.textContent = '';
        }
        currentDisplay.textContent += button.textContent;
    });
});


operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentDisplay.textContent.includes('+') || 
            currentDisplay.textContent.includes('−') || 
            currentDisplay.textContent.includes('×') || 
            currentDisplay.textContent.includes('÷')) {
            const parts = currentDisplay.textContent.split(operator);
            firstNumber = operate(Number(parts[0]), Number(parts[1]), operator);
        }
        else if (currentDisplay.textContent === 'are u dumb?') {
            currentDisplay.textContent = '0';
            firstNumber = '';
            operator = '';
            shouldResetDisplay = false;
        }
        else {
            firstNumber = currentDisplay.textContent;
        }
        
        operator = button.textContent;
        currentDisplay.textContent = `${firstNumber}${operator}`;
        shouldResetDisplay = true;
    });
});


document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key >= '0' && key <= '9') {
        document.querySelector(`.${key === '0' ? 'zero' : ['one','two','three','four','five','six','seven','eight','nine'][parseInt(key) - 1]}`)?.click();
    } else if (key === '.') {
        document.querySelector('.dot')?.click();
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        document.querySelector('.equal')?.click();
    } else if (key === 'Backspace') {
        document.querySelector('.del')?.click();
    } else if (key === 'Escape' || key === 'c') {
        document.querySelector('.AC')?.click();
    } else if (key === '+') {
        document.querySelector('.add')?.click();
    } else if (key === '-') {
        document.querySelector('.sub')?.click();
    } else if (key === '*') {
        document.querySelector('.multiply')?.click();
    } else if (key === '/') {
        e.preventDefault();
        document.querySelector('.divide')?.click();
    } else if (key === '%') {
        document.querySelector('.modulo')?.click();
    }
});

function roundResult(num) {
    if (typeof num !== 'number') return num;
    if (Number.isInteger(num)) return num;
    return parseFloat(num.toFixed(10)); 
}

equalsButton.addEventListener('click', () => {
    if (currentDisplay.textContent === 'are u dumb?') {
        currentDisplay.textContent = '0';
        firstNumber = '';
        operator = '';
        shouldResetDisplay = false;
        return;
    }
    if (!operator) return;
    
    // After a result is showing, pressing = again should do nothing
    const parts = currentDisplay.textContent.split(operator);
    if (parts.length < 2) return;
    
    secondNumber = parts[1] || '';
    const result = operate(Number(firstNumber), Number(secondNumber), operator);
    currentDisplay.textContent = roundResult(result);
    shouldResetDisplay = true;
});
