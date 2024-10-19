let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    // Remove any extra spaces and handle both numbers and symbols
    value = value.trim();

    // If value is not a number (NaN), treat it as a symbol
    if (isNaN(parseFloat(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    // Update the screen with the buffer value
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C': // Reset the calculator
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=': // Perform the calculation
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case '←': // Backspace operation
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−': // Use the correct symbol for subtraction (note the minus symbol '−')
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') { // Correct subtraction operator handling
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        // Ensure the clicked element is a button
        if (event.target.tagName === 'BUTTON') {
            buttonClick(event.target.innerText);
        }
    });
}

init();