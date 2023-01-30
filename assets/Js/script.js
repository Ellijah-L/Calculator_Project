class Calculator {
    constructor(previousCalc, nextCalc) {
        this.previousCalc = previousCalc;
        this.nextCalc = nextCalc;
        this.clear();
    }

    clear() {
        this.previousCalc = '';
        this.nextCalc = '';
        this.option = undefined;
    }

    delete() {
        this.nextCalc = this.nextCalc.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.nextCalc.includes('.')) return
        this.nextCalc = this.nextCalc.toString() + number.toString();
    }
    chooseOption(option) {
        if (this.nextCalc === '') return
        if (this.previousCalc !== '') {
            this.compute()
        }
        this.option = option;
        this.previousCalc = this.nextCalc;
        this.nextCalc = '';
    }

    compute() {
        let result
        const prev = parseFloat(this.previousCalc)
        const next = parseFloat(this.nextCalc)
        if (isNaN(prev) || isNaN(next)) return
        switch (this.option) {
            case '+':
                result = prev + next
            break
            
            case '-':
                result = prev - next
            break

            case 'x':
                result = prev * next
            break

            case '/':
                result = prev / next
            break

            default: return
        }
        this.nextCalc = result
        this.option = undefined;
        this.previousCalc = '';    
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
    }
        
    }

    update() {
        nextCalc.innerText = this.nextCalc;
        if (this.option != null){
        previousCalc.innerText = `${this.previousCalc} ${this.option}`
        } else {
            previousCalc.innerText = ''
        }
    }

}




const numberButtons = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-ac]');
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-del]');
const previousCalc = document.querySelector('[data-previous]');
const nextCalc = document.querySelector('[data-next]');

const calculator = new Calculator(previousCalc, nextCalc);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.update()
    })
});

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOption(button.innerText);
        calculator.update()
    })
});

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.update()
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.update();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.update();
});