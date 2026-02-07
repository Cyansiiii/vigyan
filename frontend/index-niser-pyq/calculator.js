// Scientific Calculator Logic - IISER/JEE Official
class ScientificCalculator {
    constructor() {
        this.display = document.getElementById('calc-display');
        this.currentValue = '0';
        this.previousValue = null;
        this.operation = null;
        this.shouldResetDisplay = false;
        this.memory = 0;
        this.angleMode = 'deg'; // deg or rad
        this.initializeButtons();
    }

    initializeButtons() {
        document.querySelectorAll('.calc-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                const value = btn.dataset.value;

                if (action) {
                    this.handleAction(action);
                } else if (value) {
                    this.handleValue(value);
                }
            });
        });
    }

    handleValue(value) {
        if (this.shouldResetDisplay) {
            this.currentValue = value;
            this.shouldResetDisplay = false;
        } else {
            if (this.currentValue === '0' && value !== '.') {
                this.currentValue = value;
            } else if (value === '.' && this.currentValue.includes('.')) {
                return;
            } else {
                this.currentValue += value;
            }
        }
        this.updateDisplay();
    }

    handleAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'delete':
                this.delete();
                break;
            case 'equals':
                this.calculate();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                this.setOperation(action);
                break;
            case 'percent':
                this.percent();
                break;
            case 'negate':
                this.negate();
                break;
            case 'sqrt':
                this.sqrt();
                break;
            case 'square':
                this.square();
                break;
            case 'power':
                this.setOperation('power');
                break;
            case 'sin':
                this.trig('sin');
                break;
            case 'cos':
                this.trig('cos');
                break;
            case 'tan':
                this.trig('tan');
                break;
            case 'log':
                this.log();
                break;
            case 'ln':
                this.ln();
                break;
            case 'exp':
                this.exp();
                break;
            case 'pi':
                this.insertValue(Math.PI.toString());
                break;
            case 'e':
                this.insertValue(Math.E.toString());
                break;
            case 'factorial':
                this.factorial();
                break;
            case 'inverse':
                this.inverse();
                break;
        }
    }

    insertValue(value) {
        this.currentValue = value;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = null;
        this.operation = null;
        this.updateDisplay();
    }

    delete() {
        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        } else {
            this.currentValue = '0';
        }
        this.updateDisplay();
    }

    setOperation(op) {
        if (this.previousValue !== null && this.operation !== null) {
            this.calculate();
        }
        this.previousValue = this.currentValue;
        this.operation = op;
        this.shouldResetDisplay = true;
    }

    calculate() {
        if (this.operation === null || this.previousValue === null) return;

        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        let result;

        switch (this.operation) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    this.currentValue = 'Error';
                    this.updateDisplay();
                    return;
                }
                result = prev / current;
                break;
            case 'power':
                result = Math.pow(prev, current);
                break;
        }

        this.currentValue = this.formatResult(result);
        this.operation = null;
        this.previousValue = null;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    percent() {
        const value = parseFloat(this.currentValue);
        this.currentValue = this.formatResult(value / 100);
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    negate() {
        const value = parseFloat(this.currentValue);
        this.currentValue = this.formatResult(-value);
        this.updateDisplay();
    }

    sqrt() {
        const value = parseFloat(this.currentValue);
        if (value < 0) {
            this.currentValue = 'Error';
        } else {
            this.currentValue = this.formatResult(Math.sqrt(value));
        }
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    square() {
        const value = parseFloat(this.currentValue);
        this.currentValue = this.formatResult(value * value);
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    trig(func) {
        let value = parseFloat(this.currentValue);
        
        // Convert to radians if in degree mode
        if (this.angleMode === 'deg') {
            value = value * (Math.PI / 180);
        }

        let result;
        switch (func) {
            case 'sin':
                result = Math.sin(value);
                break;
            case 'cos':
                result = Math.cos(value);
                break;
            case 'tan':
                result = Math.tan(value);
                break;
        }

        this.currentValue = this.formatResult(result);
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    log() {
        const value = parseFloat(this.currentValue);
        if (value <= 0) {
            this.currentValue = 'Error';
        } else {
            this.currentValue = this.formatResult(Math.log10(value));
        }
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    ln() {
        const value = parseFloat(this.currentValue);
        if (value <= 0) {
            this.currentValue = 'Error';
        } else {
            this.currentValue = this.formatResult(Math.log(value));
        }
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    exp() {
        const value = parseFloat(this.currentValue);
        this.currentValue = this.formatResult(Math.exp(value));
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    factorial() {
        const value = parseInt(this.currentValue);
        if (value < 0 || !Number.isInteger(value)) {
            this.currentValue = 'Error';
        } else if (value > 170) {
            this.currentValue = 'Infinity';
        } else {
            let result = 1;
            for (let i = 2; i <= value; i++) {
                result *= i;
            }
            this.currentValue = this.formatResult(result);
        }
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    inverse() {
        const value = parseFloat(this.currentValue);
        if (value === 0) {
            this.currentValue = 'Error';
        } else {
            this.currentValue = this.formatResult(1 / value);
        }
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    formatResult(value) {
        if (!isFinite(value)) return 'Error';
        
        // Round to 10 decimal places to avoid floating point errors
        const rounded = Math.round(value * 10000000000) / 10000000000;
        
        // Convert to string and limit length
        let str = rounded.toString();
        if (str.length > 12) {
            // Use scientific notation for very large/small numbers
            return value.toExponential(6);
        }
        return str;
    }

    updateDisplay() {
        this.display.value = this.currentValue;
    }
}

// Initialize calculator when modal is shown
let calculator = null;

function initializeCalculator() {
    if (!calculator) {
        calculator = new ScientificCalculator();
    }
}

// Export for use in exam-app.js
if (typeof window !== 'undefined') {
    window.initializeCalculator = initializeCalculator;
}