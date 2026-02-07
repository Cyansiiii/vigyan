// --- Drag Functionality ---
const calcModal = document.getElementById("scientific-calculator");
const calcHeader = document.getElementById("calc-header");

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

calcHeader.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragEnd);
document.addEventListener("mousemove", drag);

function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    if (e.target === calcHeader || e.target.parentNode === calcHeader) {
        isDragging = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        // Use translate to move the element
        calcModal.style.transform = `translate(${currentX}px, ${currentY}px)`;
        // Reset the initial CSS centering
        calcModal.style.left = "initial"; 
        calcModal.style.top = "initial"; 
    }
}

// --- Calculator Logic ---
let expression = "";
let memoryValue = 0;

function toggleCalculator() {
    if (calcModal.style.display === "none" || calcModal.style.display === "") {
        calcModal.style.display = "block";
    } else {
        calcModal.style.display = "none";
    }
}

// Update Screen
function updateDisplay() {
    document.getElementById('calc-display-main').value = expression;
}

// Insert Number or Operator
function insert(val) {
    expression += val;
    updateDisplay();
}

// Append Function (Handles special logic for Trig functions)
function appendFunc(func) {
    // If it's a trig function, we need to check if we are in DEG or RAD mode
    if (func.includes('sin') || func.includes('cos') || func.includes('tan')) {
        const isDeg = document.querySelector('input[name="angle-mode"]:checked').value === 'deg';
        if (isDeg) {
            // This is a simplified way to handle deg->rad conversion for evaluation
            // Ideally, you parse the string, but for simple concatenation:
            expression += func.replace('(', '((Math.PI/180)*');
        } else {
            expression += func;
        }
    } else {
        expression += func;
    }
    updateDisplay();
}

// Clear Screen
function clearScreen() {
    expression = "";
    document.getElementById('calc-display-result').value = "0";
    updateDisplay();
}

// Backspace
function backspace() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

// Factorial
function factorial() {
    // This is complex to parse in a string, so we'll just insert a function wrapper
    // Note: A real parser is needed for complex nested factorials
    expression += "fact(";
    updateDisplay();
}

// Helper function for factorial logic needed by eval
function fact(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result = result * i;
    return result;
}

// Toggle Sign
function toggleSign() {
    if(expression.startsWith("-")) {
        expression = expression.substring(1);
    } else {
        expression = "-" + expression;
    }
    updateDisplay();
}

// Inverse 1/x
function inverse() {
    expression = `(1/(${expression}))`;
    updateDisplay();
}

// Calculate Result
function calculate() {
    try {
        // Handle Trig Functions specifically if written as plain sin/cos
        // We replace "sin(" with "Math.sin(" etc.
        let evalString = expression;
        
        // Handle Degrees/Radians
        const isDeg = document.querySelector('input[name="angle-mode"]:checked').value === 'deg';
        
        if (isDeg) {
            // Regex to wrap arguments of trig functions in conversion logic
            // Note: This regex is basic and handles simple cases like sin(90). 
            // Nested parenthesis might require a proper math library.
            // For this demo, we assume the appendFunc handled the conversion injection.
        } else {
            // Ensure standard functions map to Math object
            evalString = evalString.replace(/sin\(/g, 'Math.sin(');
            evalString = evalString.replace(/cos\(/g, 'Math.cos(');
            evalString = evalString.replace(/tan\(/g, 'Math.tan(');
        }

        const result = eval(evalString);
        document.getElementById('calc-display-result').value = result;
    } catch (e) {
        document.getElementById('calc-display-result').value = "Error";
    }
}

// Memory Functions
function memory(op) {
    const currentVal = parseFloat(document.getElementById('calc-display-result').value);
    
    switch(op) {
        case 'MC': memoryValue = 0; break;
        case 'MR': 
            expression += memoryValue; 
            updateDisplay(); 
            break;
        case 'MS': memoryValue = currentVal; break;
        case 'M+': memoryValue += currentVal; break;
        case 'M-': memoryValue -= currentVal; break;
    }
}